// 初期化の関数、初期化の関数の中身を変えるだけでいろんな図形を呼ぶ
let scene, camera, renderer, cube;

function init() {
  // scene
  scene = new THREE.Scene();
  // camera
  // PerspectiveCamera(fov, aspect, near, far) ここは定型分的な
  camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 0.1, 1000);
  // renderre
  // webブラウザで3Dのオブジェクトを表現できるようにする
  renderer = new THREE.WebGLRenderer({antialias:true});
  // レンダーサイズを画面高さ、横幅に合わせる
  renderer.setSize(window.innerWidth, window.innerHeight);

  // どこに出力するのか？
  // ボディーに対して子要素を使いしている
  // 用意したレンダラーをブラウザに出力するために追加している
  // HTMLのbody要素の中に入れている
  document.body.appendChild(renderer.domElement);

  // ボックスのサイズ決定、メッシュ、追加
  // 幅、高さ、長さを指定
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  // 色や素材を決定できる
  // この関数は光源を必要としない

  const texture = new THREE.TextureLoader().load("./texture.jpg");
  const material = new THREE.MeshBasicMaterial({map: texture});
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // カメラの位置を設定
  camera.position.z = 5;
}

// アニメーション制御
function animate() {
  // call back関数
  requestAnimationFrame(animate);
  // シーンとカメラでボックスを表現
  // このレンダーがあるから表現できる
  // ボックスがx軸を起点に、0.01ずつ動いていく
  cube.rotation.x += 0.01;
  // ボックスがy軸を起点に、0.01ずつ動いていく
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// ウィンドウ変更時にサイズを一定にする
function onWindowResize() {
  // このファンクションを呼ぶごとに、もう一度アスペクト比を計算して
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// サイズを変えたときに、毎回この関数を呼びたい
// サイズの幅が変える時に、関数が読まれる
window.addEventListener("resize", onWindowResize);

init();
animate();
