/**
 * Created by Volkan on 20.3.2016.
 */
exports.index = function(req, res){
  res.render('index',{title:"Search algorithms"});
};

exports.result = function(req, res){
  var sonuc = 0;
  var wic = "";
  console.time('Sure:');
  var totalDist = 0;
  var A = {
    name:"A",
    leafs:[{
      node:"X",
      dist:45
    },{
      node:"Y",
      dist:60
    },{
      node:"Z",
      dist:52
    }],
    selected:0,
    hdist:350,
    addeddist:0,
    cost:0
  };

  var X = {
    name:"X",
    leafs:[{
      node:"Y",
      dist:58
    },{
      node:"K",
      dist:73
    }],
    hdist:330,
    selected:0,
    addeddist:0,
    cost:0
  };

  var Y = {
    name:"Y",
    leafs:[{
      node:"A",
      dist:60
    },{
      node:"X",
      dist:58
    },{
      node:"L",
      dist:81
    },{
      node:"M",
      dist:135
    },{
      node:"N",
      dist:123
    }],
    hdist:320,
    selected:0,
    addeddist:0,
    cost:0
  };

  var Z = {
    name:"Z",
    leafs:[{
      node:"A",
      dist:52
    },{
      node:"N",
      dist:85
    }],
    hdist:335,
    selected:0,
    addeddist:0,
    cost:0
  };

  var K = {
    name:"K",
    leafs:[{
      node:"X",
      dist:73
    },{
      node:"L",
      dist:40
    }],
    hdist:226,
    selected:0,
    addeddist:0,
    cost:0
  };

  var N = {
    name:"N",
    leafs:[{
      node:"Z",
      dist:85
    },{
      node:"Y",
      dist:123
    },{
      node:"T",
      dist:62
    }],
    hdist:92,
    selected:0,
    addeddist:0,
    cost:0
  };

  var L = {
    name:"L",
    leafs:[{
      node:"K",
      dist:40
    },{
      node:"Y",
      dist:81
    },{
      node:"M",
      dist:53
    },{
      node:"B",
      dist:165
    }],
    hdist:153,
    selected:0,
    addeddist:0,
    cost:0
  };
  var M = {
    name:"M",
    leafs:[{
      node:"Y",
      dist:135
    },{
      node:"L",
      dist:53
    },{
      node:"T",
      dist:80
    },{
      node:"B",
      dist:94
    }],
    hdist:100,
    selected:0,
    addeddist:0,
    cost:0
  };

  var T = {
    name:"T",
    leafs:[{
      node:"N",
      dist:62
    },{
      node:"M",
      dist:80
    },{
      node:"B",
      dist:78
    }],
    hdist:51,
    selected:0,
    addeddist:0,
    cost:0
  };


  var B = {
    name:"B",
    leafs:[{
      node:"L",
      dist:165
    },{
      node:"M",
      dist:94
    },{
      node:"T",
      dist:78
    }],
    hdist:0,
    selected:0,
    addeddist:0,
    cost:0
  };


//BFS
  var path=[];
  var queue = [];
  function breadthFirstSearch(node,target){
    //Siranin ilk elemanını at
    queue.shift();
    for(var i=0;i<node.leafs.length;i++){
      if(node.leafs[i].node.toString() == target.name){
        selectNode(node.leafs[i].node.toString()).wic = node.name;
        //console.log("buldum!");
        // Bulunan yolu path'e at
        path.push(target.wic+""+target.name);
        sonuc = sonuc + node.leafs[i].dist;
        var wicc = node.name;

        while("NOTHING" != selectNode(wicc.toString()).wic){

          for(var g=0;g<selectNode(wicc.toString()).leafs.length;g++){
            if(selectNode(wicc.toString()).leafs[g].node == selectNode(wicc.toString()).wic){
              sonuc=sonuc +selectNode(wicc.toString()).leafs[g].dist;
             // console.log(sonuc);
             // console.log(selectNode(wicc.toString()).wic);
            }
          }
          path.unshift(selectNode(wicc.toString()).wic+""+wicc);
          wicc=selectNode(wicc.toString()).wic;

        }
        path.unshift("NOTHING"+""+wicc);
       // console.log(path);
        return;
      }else{
        if(selectNode(node.leafs[i].node.toString()).selected == 0){
        selectNode(node.leafs[i].node.toString()).selected = 1;
        //O node'a nereden geldigini yaz
        selectNode(node.leafs[i].node.toString()).wic = node.name;
        //Secilen node'u siraya ekle
        queue.push(node.leafs[i].node);
         }
      }
    }

    if(queue[0]!= null){
      //console.log(queue[0]);
      breadthFirstSearch(selectNode(queue[0]),target);
    }else{
      console.log("BU NODA GIDEN YOL YOK HACI");
    }
  }



//<<----- Greedy Best First Search  ----->>
  function greedyBestFirstSearch(node,target){
    path.push(node.wic+""+node.name);

    var min ={
      node:node.name,
      hdist:9007199254740990
    };

    for(var i=0;i<node.leafs.length;i++){

      //Hedef noktaya varildiysa
      if(node.leafs[i].node == target.name.toString()){
        selectNode(node.leafs[i].node.toString()).wic = node.name;
        min.node = node.leafs[i].node;
        min.hdist = selectNode(node.leafs[i].node.toString()).hdist;
        min.realdist = node.leafs[i].dist;
        totalDist = totalDist+min.realdist;
        //  console.log("Min:"+min.node+" realdist:"+min.realdist+ " Secilen hdist "+min.hdist);
        //  console.log("Buldum! TotalDist:"+totalDist);
        path.push(target.wic+""+target.name);
       // console.log(path);
       // console.log(totalDist);
        sonuc= totalDist;
        return;
      }else{
        //Eger en kisa sezgisel uzakliksa ve tepe daha once secilmemis ise
        if(min.hdist > selectNode(node.leafs[i].node.toString()).hdist && selectNode(node.leafs[i].node.toString()).selected == 0){
          selectNode(node.leafs[i].node.toString()).wic = node.name;
          min.node = node.leafs[i].node;
          min.hdist = selectNode(node.leafs[i].node.toString()).hdist;
          min.realdist = node.leafs[i].dist;
        }
      }
    }
    //Secilmis olarak isaretle
    selectNode(min.node.toString()).selected =1;

    //Minimum uzakligi yazdir
    //   console.log("Min:"+min.node+" realdist:"+min.realdist+ " Secilen hdist "+min.hdist);

    //Eger o nodtan baska gidilecek yol yoksa
    if(min.node==node.name){
      //   console.log("Bulamad�m!");
      if(node.wic !== "NOTHING"){
        //Bir ustteki noda cik (wic= where i come)
        greedyBestFirstSearch(selectNode(node.wic.toString()),target);
      }else{
        //Eger en ust noda ciktigimiz halde ve baska gidilecek yol yoksa
        console.log("BU NODA GIDEN YOL YOK HACI");
      }
    }else{
      //Total gercek uzakligi ekle
      totalDist = totalDist+min.realdist;
      //Bulunan minumum uzaklikli node icin tekrar calistir
      greedyBestFirstSearch(selectNode(min.node.toString()),target);
    }
  }

  var pathlist=[];

  //<<----- A* Search  ----->>
  function astarSearch(node,target){

    //Bulunan node'daki yollari ekle
    for(var i=0;i<node.leafs.length;i++){
      if(selectNode(node.leafs[i].node).selected == 0){
        selectNode(node.leafs[i].node).selected =1;
        selectNode(node.leafs[i].node).cost=node.cost+node.leafs[i].dist;
        pathlist.push({
          node:node.leafs[i].node,
          realdist:node.leafs[i].dist,
          hdist:selectNode(node.leafs[i].node).hdist,
          wic:node.name,
          used:0,
          cost:node.cost+node.leafs[i].dist
        });
      }else{
        //Eger baska yoldan oraya daha fazla cost ile gelinmiş ise wic degis
        if(selectNode(node.leafs[i].node).cost > node.cost+node.leafs[i].dist){
          for(var j=0;j<pathlist.length;j++){
            if( pathlist[j].node ==node.leafs[i].node){
              selectNode(node.leafs[i].node).cost=node.cost+node.leafs[i].dist;
              pathlist[j].cost =node.cost+node.leafs[i].dist;
              pathlist[j].wic = node.name;
              pathlist[j].used = 0;
            }
          }
        }
      }
    }
    //işleme giren yolları sil
    for(var j=0;j<pathlist.length;j++){
      if( pathlist[j].node == node.name){
        pathlist[j].used = 1;
      }
    }

    var min ={
      node:"NOTHING",
      cost:9007199254740990
    }

    //Yolları kontrol et en küçüğünü seç
    for(var j=0;j<pathlist.length;j++){
      if(min.cost>selectNode(pathlist[j].node).cost+selectNode(pathlist[j].node).hdist && pathlist[j].used==0  ){
        min.cost=selectNode(pathlist[j].node).cost+selectNode(pathlist[j].node).hdist;
        min.node=pathlist[j].node;
      }
    }
    if(min.node == "NOTHING"){
      for(var k=0;k<pathlist.length;k++){
        if(pathlist[k].node == target.name){
          sonuc = selectNode(pathlist[k].node).cost;
          //console.log(selectNode(pathlist[k].node).cost);
          //Burası yolu yazdırmak icin!
          wic = pathlist[k].node;

          while("NOTHING" != selectNode(wic.toString()).wic){
            //console.log(finish.toString()+ wic.toString());
            for(var p=0;p<pathlist.length;p++){
              //  console.log(wic.toString()+pathlist[p].node.toString());
              if(wic == pathlist[p].node ){
                path.unshift(pathlist[p].wic+""+wic);
                wic = pathlist[p].wic;
    //              console.log(path);
                }
            }
          }
          path.unshift("NOTHING"+""+wic);
         // console.log(path);
         // console.log(pathlist);
          return;
        }
      }
    }else{
      astarSearch(selectNode(min.node),target);
    }
  }


  //<<----- Uniform Cost Search  ----->>
  function uniformCostSearch(node,target){

    //Bulunan node'daki yollari ekle
    for(var i=0;i<node.leafs.length;i++){
      if(selectNode(node.leafs[i].node).selected == 0){
        selectNode(node.leafs[i].node).selected =1;
        selectNode(node.leafs[i].node).cost=node.cost+node.leafs[i].dist;
        pathlist.push({
          node:node.leafs[i].node,
          realdist:node.leafs[i].dist,
          hdist:selectNode(node.leafs[i].node).hdist,
          wic:node.name,
          used:0,
          cost:node.cost+node.leafs[i].dist
        });
      }else{
        //Eger baska yoldan oraya daha az cost gelinmiş ise wic ve cost degis
        if(selectNode(node.leafs[i].node).cost > node.cost+node.leafs[i].dist){
          for(var j=0;j<pathlist.length;j++){
            if( pathlist[j].node ==node.leafs[i].node){
              selectNode(node.leafs[i].node).cost=node.cost+node.leafs[i].dist;
              pathlist[j].cost =node.cost+node.leafs[i].dist;
              pathlist[j].wic = node.name;
              pathlist[j].used = 0;
            }
          }
        }
      }
    }
    //isleme giren yollari kullanilmis olarak isaretle
    for(var j=0;j<pathlist.length;j++){
      if( pathlist[j].node == node.name){
        pathlist[j].used = 1;
      }
    }

    var min ={
      node:"NOTHING",
      cost:9007199254740990
    }

    //Yolları kontrol et en küçüğünü seç
    for(var j=0;j<pathlist.length;j++){
      if(min.cost>selectNode(pathlist[j].node).cost && pathlist[j].used==0  ){
        min.cost=selectNode(pathlist[j].node).cost;
        min.node=pathlist[j].node;
      }
    }
    if(min.node == "NOTHING"){
      for(var k=0;k<pathlist.length;k++){
        if(pathlist[k].node == target.name){
          sonuc = selectNode(pathlist[k].node).cost;
         // console.log(selectNode(pathlist[k].node).cost);
          //Burası yolu yazdırmak icin!
          wic = pathlist[k].node;

          while("NOTHING" != selectNode(wic.toString()).wic){
            //console.log(finish.toString()+ wic.toString());
            for(var p=0;p<pathlist.length;p++){
              //  console.log(wic.toString()+pathlist[p].node.toString());
              if(wic == pathlist[p].node ){
                path.unshift(pathlist[p].wic+""+wic);
                wic = pathlist[p].wic;
                //  console.log(path);
              }
            }
          }
          path.unshift("NOTHING"+""+wic);
        //  console.log(path);
          //console.log(pathlist);
          return;
        }
      }
    }else{
      uniformCostSearch(selectNode(min.node),target);
    }
  }


  //String ile objeyi cagirma
  function selectNode(node){
    if(node == "A"){
      return A;
    }
    if(node == "X"){
      return X;
    }
    if(node == "Y"){
      return Y;
    }
    if(node == "Z"){
      return Z;
    }
    if(node == "K"){
      return K;
    }
    if(node == "N"){
      return N;
    }
    if(node == "L"){
      return L;
    }
    if(node == "M"){
      return M;
    }
    if(node == "T"){
      return T;
    }
    if(node == "B"){
      return B;
    }
    console.log("Hatali node");
    res.render('404',{title:'olmaz haci birdaha dene'});
    return "false";
  }
  var finish ="";
  function mainFunc(algorithm,start,target){
    if(algorithm == "BFS"){
      //Baslangıc ve bitis noktasının dinamik olması icin
      finish = target.name;
      start.wic= "NOTHING";
      start.selected = 1;
      //Baslangic elemanını siraya ekle
      queue.push(start.name);
      //console.log(queue);
      breadthFirstSearch(start,target);
      return;
    }
    if(algorithm == "UCS"){
      //Baslangıc ve bitis noktasının dinamik olması icin
      finish = target.name;
      start.wic= "NOTHING";
      start.selected = 1;
      uniformCostSearch(start,target);
      return;
    }
    if(algorithm == "ASTAR"){
      //Baslangıc ve bitis noktasının dinamik olması icin
     // console.log(target);
      finish = target.name;
      start.wic= "NOTHING";
      start.selected = 1;
      astarSearch(start,target);
      return;
    }
    if(algorithm == "GBS"){
      //Baslangıc ve bitis noktasının dinamik olması icin
      finish = target.name;
      start.wic= "NOTHING";
      start.selected = 1;
      greedyBestFirstSearch(start,target);
      return;
    }
    console.log("Hatali fonksiyon!");
    res.render('404',{title:'olmaz haci birdaha dene'});
    return;
  }

  var from = selectNode(req.body['from'].toString());
 // console.log(req.body['to']);
  var to = selectNode(req.body['to'].toString());
  var algorithm= req.body['algorithm'];
  if(from == "false" || to == "false" ){
    res.render('404',{title:'olmaz haci birdaha dene'});
  }else{
    //console.log(to);
    mainFunc(algorithm,from,to);
  }
  console.timeEnd('Sure:');

  res.render('result',{title:sonuc,path:path,algorithm:algorithm});
};