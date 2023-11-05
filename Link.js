
class Link {

    distance;
    sommets ;// table de size 2 pour sommet depart et sommet de fin o----O
    //                                                                 ^  voilla le lien
    constructor(sometDepart,sometFin,distance){
        this.sommets    = [sometDepart,sometFin];
        this.distance   = distance ;
    }
}
