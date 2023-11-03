var display = $('#map');

var A = new Sommet('A') ,
    B = new Sommet('B') ,
    C = new Sommet('C') ,
    D = new Sommet('D') ;


A.addLink(B,2);
A.addLink(C,3);

B.addLink(C,2);
C.addLink(D,2);



// fislina 

var map = [
    A,B,C,D
]


function runAlgoRithmDikstra( sommetDepart , sommetFin ){

    
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
        for (const it of iterationOperations) {
            for (const op of it ) {
                
                for (const lockedSommet of lockedSommets) {
                    if( !(lockedSommet === op.sommet ) && !(op.sommet===poinEnCours) ){ 

                        if( iterationDistances[index+1] >= op.sommeDistance ){

                            console.log(
                                op.sommet   ,
                                lockedSommet,
                                poinEnCours ,
                            );
                            
                            iterationDistances[index+1] =  op.sommeDistance ;
                            mustBeLocked = op.sommet ;
                            poinEnCours = op.sommet ;
                        }

                    }
                }

            }
        }

        lockedSommets[ index ] = mustBeLocked ;
    }
    
    console.log(iterationDistances);
    console.log(lockedSommets);
    console.log(iterationSommet);
    console.log(iterationOperations);
    console.log('debug');
    
}



runAlgoRithmDikstra(A);
