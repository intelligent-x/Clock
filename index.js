var canvas = document.getElementById('canvas'),
	gd = canvas.getContext('2d'),
	date = new Date(),
	second = date.getSeconds(), 
	minute = date.getMinutes() + date.getSeconds() / 60, 
	hour = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;

gd.translate( canvas.width / 2, canvas.height / 2 );

function draw(){
	// 绘制边框
	gd.beginPath();
	gd.strokeStyle = 'white';
	gd.arc( 0, 0, 300, 0, Math.PI * 2 );
	gd.lineWidth = 5 ;
	gd.stroke();

	// 中心点
	gd.beginPath();
	gd.fillStyle = 'white';
	gd.arc( 0, 0, 15, 0, Math.PI * 2 );
	gd.fill(); 

	// 绘制刻度
	for( let i = 0 ; i < 12 ; i ++ ){
		gd.beginPath();
		gd.rotate( 30 * Math.PI / 180 );
		gd.moveTo( 270, 0 );
		gd.lineTo( 300, 0 );
		gd.stroke();
	}
	for( let i = 0 ; i < 60 ; i ++ ){
		gd.beginPath();
		gd.rotate( 6 * Math.PI / 180 );
		gd.moveTo( 285, 0 );
		gd.lineTo( 300, 0 );
		gd.lineWidth = 3;
		gd.stroke();
	}

	// 数字
	for( let i = 1 ; i <= 12 ; i ++ ){
		let x = 0, y = 0;
		let r = 240;
		if( i < 10 ){
			x = r * Math.cos( ( i * 30 - 90 ) * Math.PI / 180 ) - 15
		}else{
			x = r * Math.cos( ( i * 30 - 90 ) * Math.PI / 180 ) - 30;
		}
		y = r * Math.sin( ( i * 30 - 90 ) * Math.PI / 180 ) + 25;

		gd.beginPath();
		gd.font = 'bold 50px 微软雅黑';
		gd.fillText( i, x, y );
	}
};draw();

function drawIt( hour, minute, second ){
	gd.clearRect( -1 * canvas.width / 2, -1 * canvas.height / 2, canvas.width, canvas.height );
	gd.beginPath();
	gd.save();
	gd.rotate( hour * 30 * Math.PI / 180 );
	gd.moveTo( 0, 0 );
	gd.lineTo( 0, -100 );
	gd.lineWidth = 10;
	gd.stroke();
	gd.restore();
	draw();
	gd.beginPath();
	gd.save();
	gd.rotate( minute * 6 * Math.PI / 180 );
	gd.moveTo( 0, 0 );
	gd.lineTo( 0, -130 );
	gd.lineWidth = 6;
	gd.stroke();
	gd.restore();
	draw();
	gd.beginPath();
	gd.save();
	gd.rotate( second * 6 * Math.PI / 180 );
	gd.moveTo( 0, 0 );
	gd.lineTo( 0, -200 );
	gd.lineWidth = 3;
	gd.stroke();
	gd.restore();
	draw();
}

window.onload = () => {
	drawIt( hour, minute, second );
	setInterval(()=>{
		second += 1;
		minute += 1 / 60;
		hour += 1 / 3600;
		drawIt( hour, minute, second );
	}, 1000);
}