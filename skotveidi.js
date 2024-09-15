var canvas;
var gl;
var vPosition;

var bufferIdthry;
var bufferIdfeitt;
var bufferIdftvo;
var bufferIdfthru;
var bufferIdffjogur;
var bufferIdffimm;
var bufferSkot
var bufferStrik;

var locColor;
var colorThry= vec4(1.0, 0.0, 0.0, 1.0);
var colorFugl= vec4(1.0, 0.0, 0.0, 1.0);

var fugleitt;
var fugltvo;
var fuglthru;
var fuglfjogur;
var fuglfimm;

var vertices;

var skot = [];
var strik=[];
var stig=0;

var mouseX;             // Old value of x-coordinate  
var movement = false;   // Do we move the paddle?
var hradi = [];

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.9, 0.9, 0.9, 1.0 );

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    //Hnit byssu
    vertices = [
        vec2(-0.1, -0.9),  
        vec2(0.1, -0.9),   
        vec2(0.0, -0.7)    
    ];

    //Hnit fugla

    fugleitt = [
        vec2(-0.8, 0.6),  
        vec2(-0.8, 0.7),
        vec2(-0.6, 0.6),
        vec2(-0.6, 0.7)
    ];
    
    fugltvo = [
        vec2(-0.4, 0.4),  
        vec2(-0.4, 0.5),
        vec2(-0.2, 0.4),
        vec2(-0.2, 0.5)
    ];
    
    fuglthru = [
        vec2(0.0, 0.2),  
        vec2(0.0, 0.3),
        vec2(0.2, 0.2),
        vec2(0.2, 0.3)
    ];
    
    fuglfjogur = [
        vec2(0.4, 0.0), 
        vec2(0.4, 0.1),
        vec2(0.6, 0.0),
        vec2(0.6, 0.1)
    ];
    
    fuglfimm = [
        vec2(0.4, -0.2),  
        vec2(0.4, -0.1),
        vec2(0.6, -0.2),
        vec2(0.6, -0.1)
    ];
    
    // Load the data into the GPU
    bufferIdthry = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdthry );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    //Fuglar
    bufferIdfeitt = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdfeitt );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(fugleitt), gl.STATIC_DRAW );

    bufferIdftvo = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdftvo );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(fugltvo), gl.STATIC_DRAW );

    bufferIdfthru = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdfthru );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(fuglthru), gl.STATIC_DRAW );

    bufferIdffjogur = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdffjogur );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(fuglfjogur), gl.STATIC_DRAW );

    bufferIdffimm = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdffimm );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(fuglfimm), gl.STATIC_DRAW );

    //Skot
    bufferSkot = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferSkot);
    gl.bufferData(gl.ARRAY_BUFFER, 8*5, gl.STATIC_DRAW)

    //Strik
    bufferStrik = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferStrik);
    gl.bufferData(gl.ARRAY_BUFFER, 8*5, gl.STATIC_DRAW)

    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    locColor = gl.getUniformLocation( program, "fcolor" );
   
    // Event listeners for mouse
    canvas.addEventListener("mousedown", function(e){
        movement = true;
        mouseX = e.offsetX;
    } );

    canvas.addEventListener("mouseup", function(e){
        movement = false;
    } );

    canvas.addEventListener("mousemove", function(e){
        if(movement) {
            var xmove = 2*(e.offsetX - mouseX)/canvas.width;
            mouseX = e.offsetX;
            for(i=0; i<3; i++) {
                vertices[i][0] += xmove;
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdthry);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(vertices));
        }
    } );

    window.addEventListener("keydown", function(event) {
        switch(event.key) {
            case ' ':

            if (skot.length < 5) {
                var a = [
                    vertices[2][0], 
                    vertices[2][1]
                ];

                skot.push(a);
            }
            break;
            
        }
    });

    render();
}

function skotid(){
    for (var i = 0; i < skot.length; i++) {
        var eittskot = skot[i];

        if (eittskot[0] >= fugleitt[0][0] && eittskot[0]  <= fugleitt[2][0] && eittskot[1]  >= fugleitt[0][1] && eittskot[1]  <= fugleitt[1][1]) {
            fugleitt = [
                vec2(0.0, 0.0),
                vec2(0.0, 0.0),
                vec2(0.0, 0.0),
                vec2(0.0, 0.0)
            ];

            gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdfeitt);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(fugleitt));

            stig +=1;
            buatilstrik()
            skot.splice(i, 1);
    
        }

        if (eittskot[0] >= fugltvo[0][0] && eittskot[0]  <= fugltvo[2][0] && eittskot[1]  >= fugltvo[0][1] && eittskot[1]  <= fugltvo[1][1]) {
            fugltvo = [
                vec2(0.0, 0.0),
                vec2(0.0, 0.0),
                vec2(0.0, 0.0),
                vec2(0.0, 0.0)
            ];

            gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdftvo);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(fugltvo));

            stig +=1;
            buatilstrik()
            skot.splice(i, 1);
          
        }

        if (eittskot[0] >= fuglthru[0][0] && eittskot[0]  <= fuglthru[2][0] && eittskot[1]  >= fuglthru[0][1] && eittskot[1]  <= fuglthru[1][1]) {
            fuglthru = [
                vec2(0.0, 0.0),
                vec2(0.0, 0.0),
                vec2(0.0, 0.0),
                vec2(0.0, 0.0)
            ];

            gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdfthru);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(fuglthru));

            stig +=1;
            buatilstrik()
            skot.splice(i, 1);
      
            
        }

        if (eittskot[0] >= fuglfjogur[0][0] && eittskot[0]  <= fuglfjogur[2][0] && eittskot[1]  >= fuglfjogur[0][1] && eittskot[1]  <= fuglfjogur[1][1]) {
            fuglfjogur = [
                vec2(0.0, 0.0),
                vec2(0.0, 0.0),
                vec2(0.0, 0.0),
                vec2(0.0, 0.0)
            ];

            gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdffjogur);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(fuglfjogur));

            stig +=1;
            buatilstrik()
            skot.splice(i, 1);
      
        }

        if (eittskot[0] >= fuglfimm[0][0] && eittskot[0]  <= fuglfimm[2][0] && eittskot[1]  >= fuglfimm[0][1] && eittskot[1]  <= fuglfimm[1][1]) {
            fuglfimm = [
                vec2(0.0, 0.0),
                vec2(0.0, 0.0),
                vec2(0.0, 0.0),
                vec2(0.0, 0.0)
            ];

            gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdffimm);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(fuglfimm));

            stig +=1;
            buatilstrik()
            skot.splice(i, 1);
       
        }
        
    }

}

function buatilstrik(){
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferStrik);
    var linax = vec2(0.7+(stig*0.03),0.9);
    strik.push(linax);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(strik));

}

function teiknaFugl(buffer, litur){
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.uniform4fv( locColor, flatten(litur) );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

}

function bindFugl(buffer,hnit){
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
    gl.bufferSubData( gl.ARRAY_BUFFER, 0, flatten(hnit) );

}

function hreyfing(fugl,gildi){
    gl.clear( gl.COLOR_BUFFER_BIT );

    if (Math.max(fugl[0][0], fugl[2][0]) >= 1.0 || Math.min(fugl[0][0], fugl[2][0]) <= -1.0) {
        hradi[gildi] = -hradi[gildi]; 
    }

    for (var i = 0; i < 4; i++) {
        fugl[i][0] += hradi[gildi];
    }
}

function render() {
    
    gl.clear( gl.COLOR_BUFFER_BIT );

    skotid(); 

    for(var k=0; k<5 ; k++){
        var gildi = (Math.random() * (0.05 - (-0.05)) - 0.05);

        while(gildi==0){
            gildi=(Math.random() * (0.05 - (-0.05)) - 0.05);
        }

        hradi.push(gildi);
    }

    hreyfing(fugleitt,0);
    hreyfing(fugltvo,1);
    hreyfing(fuglthru,2);
    hreyfing(fuglfjogur,3);
    hreyfing(fuglfimm,4);

    bindFugl(bufferIdfeitt,fugleitt);
    bindFugl(bufferIdftvo, fugltvo);
    bindFugl(bufferIdfthru, fuglthru);
    bindFugl(bufferIdffjogur, fuglfjogur);
    bindFugl(bufferIdffimm, fuglfimm);

    //Teikna þríhyrning
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdthry );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.uniform4fv( locColor, flatten(colorThry) );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );

    //Teikna fugla
    teiknaFugl(bufferIdfeitt, colorFugl);
    teiknaFugl(bufferIdftvo, colorFugl);
    teiknaFugl(bufferIdfthru, colorFugl);
    teiknaFugl(bufferIdffjogur, colorFugl);
    teiknaFugl(bufferIdffimm, colorFugl);
   
    //Teikna skot
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferSkot);

    for (var i = 0; i < skot.length; i++) {
        skot[i][1] += 0.02; 

        if(skot[i][1]>=1.0){
            skot.splice(i, 1);
            continue; 
        }
        var stada = [
            vec2(skot[i][0] - 0.01, skot[i][1]),
            vec2(skot[i][0]+ 0.01, skot[i][1]),
            vec2(skot[i][0] - 0.01, skot[i][1] + 0.05),
            vec2(skot[i][0] + 0.01, skot[i][1] + 0.05)
        ];
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(stada));
        gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
        gl.uniform4fv(locColor, flatten(colorThry));
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, bufferStrik);

    for (var j = 0; j < strik.length; j++) {
        var stada = [
            vec2(strik[j][0] , strik[j][1]- 0.08), 
            vec2(strik[j][0], strik[j][1] + 0.08)
        ];

        gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(stada));
        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.LINES, 0, 2); 
    }

    window.requestAnimFrame(render);
}