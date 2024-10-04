import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry }from 'three/examples/jsm/geometries/TextGeometry.js'
    
import GUI from 'lil-gui'



/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/// axis helper 

// const axis = new THREE.AxesHelper()
// scene.add(axis)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const MatcapTextue = textureLoader.load('static/textures/matcaps/8.png')
const MatcapTextue1 = textureLoader.load('static/textures/matcaps/6.png')


const fontLoder = new FontLoader()
fontLoder.load(
    'static/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'for my sis.',
            {
                font: font,
                size: 0.5,
                depth: 0.2,
                curveSegments: 4,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            })
        // textGeometry.computeBoundingBox()        

        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.2) * 0.5,
        //     - (textGeometry.boundingBox.max.y - 0.2 ) * 0.5,
        //     - (textGeometry.boundingBox.max.z - 0.3 ) * 0.5

        // );
        const textMaterial = new THREE.MeshMatcapMaterial()
        textMaterial.matcap = MatcapTextue
        // textMaterial.wireframe = true
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)
        textGeometry.center()
        
        console.time('donuts')

        const donutMesh = new THREE.MeshMatcapMaterial()
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        donutMesh.matcap = MatcapTextue1
        for (let i = 0; i < 200; i++){

            const donut = new THREE.Mesh( donutGeometry, donutMesh)

            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            donut.scale.set(scale, scale,scale)

            scene.add(donut)
        }
        console.timeEnd('donuts')
    }
)

/**
 * Objects
 */


// const meshMaterial = new THREE.MeshMatcapMaterial()
// const donutGeometry = new THREE.Mesh(
//     new THREE.TorusGeometry(),
//     meshMaterial
// )

// scene.add(donutGeometry)


const amebientLight = new THREE.AmbientLight()
scene.add(amebientLight)

const pointLight = new THREE.PointLight()

pointLight.position.y = 4

scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    // const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
