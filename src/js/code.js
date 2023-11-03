var display = $('#map');

var A = new Sommet('A') ,
    B = new Sommet('B') ,
    C = new Sommet('C') ,
    D = new Sommet('D') ,
    E = new Sommet('E') ,
    F = new Sommet('F') ,
    G = new Sommet('G') ;


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


// fislina 

var map = [
    A,B,C,D,E,F,G
]


function runAlgoRithmDikstra( sommetDepart , sommetFin ){

    function afficherEnResultItteration(objectDETAILED){
        console.log(`Point : ${objectDETAILED.sommet.nom} vien de point : ${objectDETAILED.source.nom} , distance totale de point de depart : ${objectDETAILED.sommeDistance}`);
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
    
}



runAlgoRithmDikstra(A);
