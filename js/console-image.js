/**
 * Dubiously created by Adrian Cooney
 * http://dunxrion.github.io
 */

(function(console) {
	"use strict";

	//Bootlegged of imgur.com/memegen
	var memes = {"Professor":"","Adriano":"https://i.imgur.com/NXqsoky.jpg","Allan":"https://i.imgur.com/KXhmub4.jpg","Bárbara":"https://i.imgur.com/Tl5L0nx.jpg","Bia":"https://i.imgur.com/7fcGV06.jpg","Callegaro":"https://i.imgur.com/dgMRiKB.jpg","Cátia":"https://i.imgur.com/fKuV1Mw.jpg","Chang":"https://i.imgur.com/aVmrYxZ.jpg","Chico":"https://i.imgur.com/CqKk8IR.jpg","Clarisse":"https://i.imgur.com/rGIPtgt.jpg","Cristiano":"https://i.imgur.com/bWTQrqd.jpg","Dalton":"https://i.imgur.com/J7bNfkh.jpg","Danilo":"https://i.imgur.com/OFsUWBm.jpg","Dé":"https://i.imgur.com/fGfeUaf.jpg","Denis":"https://i.imgur.com/1ZYuqY3.jpg","-Eduardo":"","Erivaldo":"https://i.imgur.com/Uydv247.jpg","Evandro":"https://i.imgur.com/uLTc6PZ.jpg","Everaldo":"https://i.imgur.com/EJwUTyG.jpg","Feline":"https://i.imgur.com/7ffW10X.jpg","Felipe":"https://i.imgur.com/mvqAxkf.jpg","Fernando":"https://i.imgur.com/PXLB0A9.jpg","Francis":"https://i.imgur.com/NH13LYi.jpg","Gabriel":"https://i.imgur.com/aOH0n2z.jpg","Grega":"https://i.imgur.com/xAXjarN.jpg","Grego":"https://i.imgur.com/HoBLnv0.jpg","Groth":"https://i.imgur.com/ZRNBzNj.jpg","Gustavo":"https://i.imgur.com/LMUcc4Q.jpg","Joãozinho":"https://i.imgur.com/d6laf0F.jpg","Josemar":"https://i.imgur.com/AWtfy1O.jpg","Julian":"https://i.imgur.com/QyuWQGs.jpg","Jurema":"https://i.imgur.com/xSjSx1p.jpg","-Leonardo":"","Manco":"https://i.imgur.com/xVezlIe.jpg","Marcão":"https://i.imgur.com/pLLdyaL.jpg","Marli Carvalho":"https://i.imgur.com/qtaYp1I.jpg","Marli Luz":"https://i.imgur.com/pTTbtVI.jpg","Marlon":"https://i.imgur.com/zVm0WqC.jpg","Miron":"https://i.imgur.com/2A3qEVN.jpg","Morena":"https://i.imgur.com/zLVo3PZ.jpg","Natani":"https://i.imgur.com/Gr7w26J.jpg","Nilo":"https://i.imgur.com/kyKpHUw.jpg","-Piu":"","Raquel":"https://i.imgur.com/6asF6DY.jpg","-Regina":"","Renato":"https://i.imgur.com/AAin8Y5.jpg","Ricardo":"https://i.imgur.com/x4XKLIz.jpg","-Suelen":"","-Tiago":"","-Tonho":"","Vila":"https://i.imgur.com/SLgBZJE.jpg"};
	var canvas = document.createElement("canvas");
	console.list = memes;

	function drawMemeText(ctx, type, text, width, y) {
		text = text.toUpperCase();
		//Determine the font size
		if(text.length < 24) {
			var val = Math.max(0, text.length - 12),
				size = 70 + (val * - 3);

			drawText(ctx, size, text, width/2, y);
		} else if(text.length < 29) {
			drawText(ctx, 40, text, width/2, y);
		} else {
			var strs = wrap(text, 27);
			strs.forEach(function(str, i) {
				drawText(ctx, 40, str, width/2, (type == "lower") ? (y - ((strs.length - 1) * 40)) + (i * 40) : y + (i * 40));
			});
		}
	}

	function drawText(ctx, size, text, x, y) {
		//Set the text styles
		ctx.font = "bold " + size + "px Anton";
		ctx.fillStyle = "#fff";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.lineWidth = 7;
		ctx.strokeStyle = "#000";
		ctx.strokeText(text, x, y);
		ctx.fillText(text, x, y);
	}
	function wrap(text, num) {
		var output = [],
			split = text.split(" ");

		var str = [];
		for(var i = 0, cache = split.length; i < cache; i++) {
			if((str + split[i]).length < num) str.push(split[i])
			else {
				output.push(str.join(" "));
				str.length = 0;
				str.push(split[i]);
			}
		}

		//Push the final line
		output.push(str.join(" "));

		return output;
	}
	console.meme = function(upper, lower, image, width, height) {
		if(!upper && !lower && !image) return console.log("> " + Object.keys(memes).join("\n> "));
		
			var ctx = canvas.getContext("2d"),
			width = width || 500,
			height = width || 500,
			//I tweaked it at these dimensions,
			//So everything scales from here
			_w = 500, _h = 500; 
			
			ctx.clearRect(0,0,width,height);

		var img = new Image();
    		img.setAttribute('crossOrigin','anonymous');
		img.onload = function() {
			canvas.width = width;
			canvas.height = height;

			var text = upper.toUpperCase();

			ctx.scale(width/500, height/500);

			//Draw the background
			ctx.drawImage(this, 0, 0, _w, _h);

			drawMemeText(ctx, "upper", upper, _w, 50); //upper
			drawMemeText(ctx, "lower", lower, _w, _h - 50); //upper

			//my lil' hack
			canvas.id = 'myCanvas';
			$('.canvas').html(canvas);
			
		};

		if(memes[image]) var url = memes[image];
		else var url = image;

		img.src = url; //"http://www.corsproxy.com/" + url.replace(/https?:\/\//, "");
	};
})(console);