const display = $('#map');
var map = [];

if(isDarkMode()){
    $(`#switchForBackGround`)[0].checked = true ;
    swapMode($(`#switchForBackGround`)[0]);
}

function initApp(){

    //reset
    display.empty();

    
    
    for (const point of map) {
    
        var pointGraphic = $('<span>') ;
        
        if( point.nom.length > 1 ){
            pointGraphic.html(`
                <span class="ticker-content">${point.nom}</div>
            `);
        }else{
            pointGraphic.html(`${point.nom}`);
        }
        pointGraphic.prop('id',`ptn_${point.nom}`);
        pointGraphic.data('sommet',point);
        pointGraphic.addClass('cercle');
        pointGraphic.addClass('draggable');
        pointGraphic.on('dblclick',(e)=>{setNewPointOrRunAlgo(point)});
        pointGraphic.on('click',(e)=>{e.stopPropagation();});
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
    
    map = map.sort((a,b)=>{
        if(a.nom>b.nom){
            return 1;
        }
        else if(a.nom<b.nom){
            return -1;
        }
        else{
            return 0;
        }
    });

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
$(`#map`).on('click',()=>{
    Point1 = null ;
    Point2 = null ;
    $('.stoping_section').removeClass('stoping_section');
}); 

// UI way to add buttons and links

var counterOfDisplays       = 0     ,
    objectOfCreation        = {}    ,
    inMiddleOfCreation      = false ;

    
var counterOfSecondDisplays = 0     ,
    objectOfSecondCreation  = {}    ,
    inMiddleOfSecondCreation= false ;


$(document).ready(function () {
    $(`#nom_point_pour_creation`).on('input',()=>{
        if(!inMiddleOfCreation){
            inMiddleOfCreation = true;
            

            counterOfDisplays ++;

            let btnID = counterOfDisplays + 0;
        
            var input = $(`<input>`);
            input.prop('id',`input_point_${btnID}`);
            input.prop('value',$(`#nom_point_pour_creation`).val());
            input.addClass('form-control point-css');
            input.on('input',(e)=>{
                objectOfCreation [btnID] = e.currentTarget.value ;
            });
            
        
            var row = $(`<tr>`) ,
                btn = $(`<btn>`);
        
            btn.addClass('btn btn-danger w-100 text-center btn-sm p-1 fs-5');
            btn.text('x');
            btn.on('click',()=>{
                $(`#rm_tr_${btnID}`).remove();
                delete objectOfCreation [btnID];
            });
            row.prop('id',`rm_tr_${btnID}`);
                
            var td1 = $(`<td>`).append(input),
                td2 = $(`<td>`).append(btn) ;
            row.append(td1);
            row.append(td2);
        
            $(`#points_placeholder`).append(row) ;
            input.trigger('focus');
        
            objectOfCreation [btnID] = $(`#nom_point_pour_creation`).val() ;
            $(`#nom_point_pour_creation`).val('');

            resetPointsSelect();

            inMiddleOfCreation = false;
        }
    });
    $(`#link_distance_pour_creation`).on('input',()=>{
        if(!inMiddleOfSecondCreation){
            inMiddleOfSecondCreation = true;
            

            
            
            counterOfSecondDisplays ++;

            let btnID = counterOfSecondDisplays + 0;
        
            var input = $(`<input>`);
            input.prop('id',`input_link_${btnID}`);
            input.prop('value',$(`#link_distance_pour_creation`).val());
            input.addClass('form-control');
            input.on('input',(e)=>{
                objectOfSecondCreation [btnID] = e.currentTarget.value ;
            });
            
        
            var row = $(`<tr>`) ,
                btn = $(`<btn>`);
        
            btn.addClass('btn btn-danger w-100 text-center btn-sm p-1 fs-5');
            btn.text('x');
            btn.on('click',()=>{
                $(`#rm_tr_select_${btnID}`).remove();
                delete objectOfSecondCreation [btnID];
            });
            row.prop('id',`rm_tr_select_${btnID}`);
                
            var td1 = $(`<td>`).append(input),
                td2 = $(`<td>`).append(btn) ;

            var td3 = $(`<td>`);
            var td4 = $(`<td>`);
            var list3 = $(`<select>`);
            var list4 = $(`<select>`);

            list3.prop('id',`select_for_linking_start_${btnID}`);
            list4.prop('id',`select_for_linking_end_${btnID}`);
            list3.addClass('form-control list_option_buttons');
            list4.addClass('form-control list_option_buttons');

            

            td3.append(list3);
            td4.append(list4);

            row.append(td3);
            row.append(td4);
            row.append(td1);
            row.append(td2);
        
            $(`#links_placeholder`).append(row) ;
            input.trigger('focus');
        
            objectOfSecondCreation [btnID] = $(`#link_distance_pour_creation`).val() ;
            $(`#link_distance_pour_creation`).val('');

            resetPointsSelect();

            inMiddleOfSecondCreation = false;
        }
    });
});

function retourEtap1(){

    $(`#section_part1`).removeClass('d-none');
    $(`#section_part2`).addClass('d-none');

    $('#btn_Suivant').removeClass('d-none');
    $('#btn_Precedant').addClass('d-none');
    $('#btn_Generate_Map').addClass('d-none');
}

function openHelperMenu(){
    $('#helpMenu').modal('show');
}

function editMap() {
    
    counterOfDisplays       = 0     ;
    objectOfCreation        = {}    ;
    counterOfSecondDisplays = 0     ;
    objectOfSecondCreation  = {}    ;

    $('#questionnaireApp').modal('show');
    $(`#points_placeholder`).empty();
    $(`#links_placeholder`).empty();
    
    $(`#nom_point_pour_creation`).val('');
    $(`#link_distance_pour_creation`).val('');
    
    $(`#section_part1`).removeClass('d-none');
    $(`#section_part2`).addClass('d-none');

    $('#btn_Suivant').removeClass('d-none');
    $('#btn_Precedant').addClass('d-none');
    $('#btn_Generate_Map').addClass('d-none');

    $(`.is-invalid`).removeClass('is-invalid');
    // create all points from map 
}


function finEtape1(){
    $(`.is-invalid`).removeClass('is-invalid');

    var isValid = true ;

    for (const [id,value] of Object.entries(objectOfCreation)) {

        if( value == '' || !isAlphaNumeric(value) ){
            $(`#input_point_${id}`).addClass('is-invalid');
            isValid = false ;
        }
        
    }


    if( Object.keys(objectOfCreation).length < 2 ){
        isValid = false ;
        showErrorMessage("Veuillez créer plus d'un seul sommet !");
    }

    if(isValid){

        $('#btn_Suivant').addClass('d-none');
        $('#btn_Precedant').removeClass('d-none');
        $('#btn_Generate_Map').removeClass('d-none');


        $(`#section_part1`).addClass('d-none');
        $(`#section_part2`).removeClass('d-none');

        $(`#link_distance_pour_creation`).val('');
        
        resetPointsSelect();

    }
}



function generateMap(){
    // generate the buttons and the links using jquery elements with the data that the user added
    $(`.is-invalid`).removeClass('is-invalid');

    var isValid = true 
        alreadyShow = [];

    for (const [id,value] of Object.entries(objectOfSecondCreation)) {

        var hash = '' ;        
        if($(`#select_for_linking_start_${id}`).val() < $(`#select_for_linking_end_${id}`).val()){
            hash = `${$(`#select_for_linking_start_${id}`).val()}_${$(`#select_for_linking_end_${id}`).val()}`;
        }else{
            hash = `${$(`#select_for_linking_end_${id}`).val()}_${$(`#select_for_linking_start_${id}`).val()}`;
        }
        if( alreadyShow.indexOf(hash) != -1 ){
            showErrorMessage("Veuillez ne pas répéter la même association !");
            $(`#select_for_linking_start_${id}`).addClass('is-invalid');
            $(`#select_for_linking_end_${id}`).addClass('is-invalid');
            isValid = false ; 
        }
        alreadyShow.push(hash);



        if( value == '' || !isNumeric(value) ){
            $(`#input_link_${id}`).addClass('is-invalid');
            isValid = false ;
        }


        if( $(`#select_for_linking_start_${id}`).val() == $(`#select_for_linking_end_${id}`).val() ){
            showErrorMessage("Veuillez ne pas connecter un point avec lui même !");
            $(`#select_for_linking_start_${id}`).addClass('is-invalid');
            $(`#select_for_linking_end_${id}`).addClass('is-invalid');
            isValid = false ;
        }

        if( $(`#select_for_linking_start_${id}`).val() == '' ){
            $(`#select_for_linking_start_${id}`).addClass('is-invalid');
            isValid = false ;
        }

        if( $(`#select_for_linking_end_${id}`).val() == '' ){
            $(`#select_for_linking_end_${id}`).addClass('is-invalid');
            isValid = false ;
        }
        
    }

    
    if(Object.keys(objectOfSecondCreation).length < (Object.keys(objectOfCreation).length - 1) ){
        isValid = false ;
        showErrorMessage("Veuillez ne pas laissez un sommet isolé !");
    }

    if(isValid){

        function findPointByValue(value){
            for (const sommet of map) {
                if(sommet.nom == value){
                    return sommet ;
                }
            }
        }

        map = [];
        
        for (const [id,value] of Object.entries(objectOfCreation)) {
            
            map.push(new Sommet(value));

        }
    
        for (const [id,distance] of Object.entries(objectOfSecondCreation)) {

            var point1 = findPointByValue($(`#select_for_linking_start_${id}`).val()) ,
                point2 = findPointByValue($(`#select_for_linking_end_${id}`).val())   ;

            // important to avoid an arrow flipping bug
            if(point1.nom < point2.nom){
                point1.addLink(point2,+distance);
            }else{
                point2.addLink(point1,+distance);
            }
            
        }
        
        initApp();
        
        $('#questionnaireApp').modal('hide');
    
    }
}

function resetPointsSelect() {
    for (const [id,point] of Object.entries(objectOfCreation)) {
        for (const list of $('.list_option_buttons')) {
            if( $(list).find(`option[value=${point}]`).length == 0 ){

                $option = $('<option>') ;
                $option.prop('value',point);
                $option.text(point);
                $(list).append($option);

            }
        }
    }
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


A.addLink( B ,  5 ) ;
A.addLink( D , 10 ) ;
A.addLink( E ,  6 ) ;
D.addLink( E ,  3 ) ;
D.addLink( F ,  1 ) ;
D.addLink( G ,  4 ) ;
D.addLink( C ,  7 ) ;
E.addLink( F ,  5 ) ;
F.addLink( G ,  2 ) ;
C.addLink( G ,  3 ) ;
B.addLink( C ,  5 ) ;
B.addLink( O ,  5 ) ;



map = [
    A,B,C,D,E,F,G,O
];

// les points de a => z si non la direction de voyage sera ironne

initApp();
runAlgoRithmDikstra(A,C);

