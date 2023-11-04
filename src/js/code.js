const display = $('#map');
var map = [];


function initApp(){

    //reset
    display.empty();

    
    
    for (const point of map) {
    
        var pointGraphic = $('<span>') ;
        
        pointGraphic.text(point.nom);
        pointGraphic.prop('id',`ptn_${point.nom}`);
        pointGraphic.data('sommet',point);
        pointGraphic.addClass('cercle');
        pointGraphic.addClass('draggable');
        pointGraphic.on('dblclick',()=>{setNewPointOrRunAlgo(point)});
        display.append(pointGraphic);
    
        for (const link of point.links) {
            
            var    id = ''                   ;
        
            if(link.sommets[0].nom < link.sommets[1].nom){
                id = `path_${link.sommets[0].nom}_${link.sommets[1].nom}`;
            }else{
                id = `path_${link.sommets[1].nom}_${link.sommets[0].nom}`;
            }
    
            if($(`#${id}`).length == 0 ){
                
                var pathGraphic = $('<span>') ;
        
                pathGraphic.addClass('path');
                pathGraphic.prop('id',id);
                pathGraphic.html(`
                    <span class="words">
                        ${link.distance}
                    </span>
                `);
                display.append(pathGraphic);
                
            }
    
        }
    
    }
    
    // chat gpt no overflowing 
    const container = display[0];
    const spans = document.querySelectorAll('.draggable');
    
    var containerWidth  = container.getBoundingClientRect().width - 100 ,
        containerHeight = container.getBoundingClientRect().height - 100 ;
    // Distribute the spans inside the container.
    for (const span of spans) {
      // Generate a random position for the span.
      let randomX = Math.random() * containerWidth;
      let randomY = Math.random() * containerHeight;
    
      // Loop until the span is not overlapping with any other span.
        randomX = Math.random() * containerWidth;
        randomY = Math.random() * containerHeight;
    
      // Set the position of the span.
      span.style.left = `${randomX}px`;
      span.style.top = `${randomY}px`;
    }
    
    
    $('.draggable').draggable({  containment: "#map",drag: function( event, ui ) {
        // Get the bounding box of the draggable element's container.
        const containerBox = $( ui.helper ).parent()[0].getBoundingClientRect();

        // Check if the draggable element is outside of the container.
        if (ui.position.left < containerBox.left || ui.position.top < containerBox.top || ui.position.left + ui.helper.outerWidth() > containerBox.right || ui.position.top + ui.helper.outerHeight() > containerBox.bottom) {
        // Prevent the draggable element from moving outside of the container.
        ui.position.left = Math.max(ui.position.left, containerBox.left);
        ui.position.top = Math.max(ui.position.top, containerBox.top);
        ui.position.left = Math.min(ui.position.left, containerBox.right - ui.helper.outerWidth());
        ui.position.top = Math.min(ui.position.top, containerBox.bottom - ui.helper.outerHeight());
        }
    } });
    $('.draggable').on('drag', function (e) {

        var sommet = $(e.currentTarget).data('sommet') ;

        for (const link of sommet.links) {
            var id = '' ;
        
            if(link.sommets[0].nom < link.sommets[1].nom){
                id = `#path_${link.sommets[0].nom}_${link.sommets[1].nom}`;
            }else{
                id = `#path_${link.sommets[1].nom}_${link.sommets[0].nom}`;
            }
            connectTwoSpansInCenter(
                $(`#ptn_${link.sommets[0].nom}`),
                $(`#ptn_${link.sommets[1].nom}`),
                $(id)
            );
        }

    });

    $('.draggable').trigger('drag');

    
}


function runAlgoRithmDikstra( sommetDepart , sommetFin ){
    
    $('.selected').removeClass('selected');
    $('.reversed').removeClass('reversed');

    var result = [];

    function afficherEnResultItteration(objectDETAILED){
        result.push(objectDETAILED);
    }

    function checkIfIsLocked(lockTable,sommetToCheck){
        for (const s of lockTable) {
            if( 
                sommetToCheck === s 
            ){ 
                return true ;
            }
        }
        return false ;
    }
    
    var poinEnCours         = sommetDepart  ,
        iterationDistances  = []            ,
        iterationOperations = []            ,
        iterationSommet     = []            ,
        lockedSommets       = []            ;
        
        iterationDistances[0] = 0 ;

    

    for (let index = 0; index < map.length; index++) {
        var operations = [] ;
        iterationSommet.push(poinEnCours);

        for (const link of poinEnCours.links){

            for (const sommet of link.sommets) {


                if( !(sommet===poinEnCours) ){
                    
                    var isAlreadyLocked = false ;

                    for(const som of iterationSommet){
                        if(som === sommet ){
                            isAlreadyLocked = true ;
                        }
                    }

                    if(!isAlreadyLocked){
                        operations.push(
                            {
                                source          : poinEnCours , 
                                sommet          : sommet , 
                                sommeDistance   : link.distance + iterationDistances[index] 
                            }
                        );
                    }

                }
    
            }
        }
        iterationOperations.push(operations);

        iterationDistances[index+1] = Infinity ;
        var mustBeLocked = (index==0 ? sommetDepart : null ) ;
        var possibleENDgoalItteration = (index==0 ? {}           : null ) ;
        for (const it of iterationOperations) {
            for (const op of it ) {
                
                if( 
                    !checkIfIsLocked(lockedSommets,op.sommet)
                ){ 

                    if( iterationDistances[index+1] >= op.sommeDistance ){

                        iterationDistances[index+1] =  op.sommeDistance ;
                        mustBeLocked = op.sommet ;
                        
                        possibleENDgoalItteration = op ;

                    }
                }

            }
        }
        
        if(index < map.length - 1 ){
            afficherEnResultItteration(possibleENDgoalItteration);
        }
        poinEnCours             = mustBeLocked ;
        lockedSommets[ index ]  = mustBeLocked ;
        

    }
    
    function recursivelyGivePath(sommet){

        $(`#ptn_${sommet.nom}`).addClass('selected');
        for (const report of result) {
            

            if(report.sommet===sommet){
                
                var id = '' ;
                if(report.sommet.nom < report.source.nom){
                    id = `#path_${report.sommet.nom}_${report.source.nom}`;
                    $(id).addClass('selected reversed');
                }else{
                    id = `#path_${report.source.nom}_${report.sommet.nom}`;
                    $(id).addClass('selected');
                }
                console.log(report.source.nom);               
                recursivelyGivePath(report.source);
                break ;
            }
        }

    }

    recursivelyGivePath(sommetFin);
}




// UI way to start the app
var Point1 = null ;
function setNewPointOrRunAlgo(Point2){
    if(Point1){
        if(Point1 === Point2){return ;}
        $(`#ptn_${Point2.nom}`).addClass('stoping_section'); 
        runAlgoRithmDikstra(Point1,Point2);
        Point1 = null;
    }else{
        $('.stoping_section').removeClass('stoping_section');
        Point1 = Point2 ;
        $(`#ptn_${Point1.nom}`).addClass('stoping_section'); 
    }
}


// UI way to add buttons and links

function editMap() {
    $('#questionnaireApp').modal('show');
}


function generateMap(){
    // generate the buttons and the links using jquery elements with the data that the user added
}


// example starting

var A = new Sommet('A') ,
    B = new Sommet('B') ,
    C = new Sommet('C') ,
    D = new Sommet('D') ,
    E = new Sommet('E') ,
    F = new Sommet('F') ,
    G = new Sommet('G') ,
    O = new Sommet('O') ;


A.addLink(B,5);
A.addLink(D,10);
A.addLink(E,6);
D.addLink(E,3);
D.addLink(F,1);
D.addLink(G,4);
D.addLink(C,7);
E.addLink(F,5);
F.addLink(G,2);
G.addLink(C,3);
B.addLink(C,5);
B.addLink(O,5);


// fislina 

map = [
    A,B,C,D,E,F,G,O
]
// les points de a => z si non la direction de voyage sera ironne

initApp();
runAlgoRithmDikstra(A,C);

