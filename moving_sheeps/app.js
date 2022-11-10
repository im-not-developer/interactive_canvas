import {Hill} from './hill.js';
import {Sun} from './sun.js';
import {SheepContoller} from './sheep-controller.js';
class App {
  constructor() {
    // canvas 생성
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    // body에 canvas 추가
    document.body.appendChild(this.canvas);

    this.hills = [
      new Hill('#fd6bea', 0.2, 12),
      new Hill('#ff59c2', 0.5, 8),
      new Hill('#ff4674', 1.4, 6),
    ];
    this.sun = new Sun();

    this.sheepContoller = new SheepContoller();
    // screen size를 가져오기 위한 이벤트 리스너 등록
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  // func - resize: 캔버스의 크기를 설정
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    // canvas 사이즈를 화면사이즈의 두배로 지정하여 retina display 에서 선명하게 지원하도록 함.
    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);

    for (let i = 0; i < this.hills.length; i++) {
      this.hills[i].resize(this.stageWidth, this.stageHeight);
    }

    this.sun.resize(this.stageWidth, this.stageHeight);
    this.sheepContoller.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    //https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame
    requestAnimationFrame(this.animate.bind(this));
    // canvas를 깨끗하게 지워주는 함수
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.sun.draw(this.ctx, t);

    let dots;
    for (let i = 0; i < this.hills.length; i++) {
      dots = this.hills[i].draw(this.ctx);
    }

    this.sheepContoller.draw(this.ctx, t, dots);
  }
}

window.onload = () => {
  new App();
};
