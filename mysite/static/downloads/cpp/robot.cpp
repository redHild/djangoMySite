#include <cstdlib>
#include <cmath>
#include <iostream>
#include <vector>

#include <time.h>

#include <GL/glew.h>
#include <GL/freeglut.h>

//X,Y, and Z indicating any movement
static float movX;
static float movY;
static float movZ;

//X,Y, and Z for the camera view.
static float viewX;
static float viewY;
static float viewZ;

//X, Y, and Z of the player and the world as a whole
static float gloX;
static float gloY;
static float gloZ;

float spd = .1;

#define DEPTH -20
#define PI 3.14159265

using namespace std;

// Drawing routine.

//VECTOR OF CUBE CLASSES

// easter egg on or off
bool delightful = false;

class VoidCube {
	float vx, vy, vz;
	int col;
	bool canGrab, isGrabbed;
	
public:
	VoidCube(float x, float y, float z) {
		vx = x;
		vy = y;
		vz = z;

		isGrabbed = false;

		if (vx < 5 && vy < 5) canGrab = true;
		else                  canGrab = false;
		col = rand() % 6;

	}

	void ShiftCube() {
		if (isGrabbed == false)
		{
			vx = vx + movX;
			vy = vy + movY;
			vz = vz + movZ;
			//canGrab check
		}
		if (abs(vx) < 3 && abs(vy) <= 3 && abs(vy) > 2 || abs(vy) < 3 && abs(vx) <= 3 && abs(vx) > 2) {
			canGrab = true;
		}
		else {
			canGrab = false;
		}
	}

	float getX() {
		return vx;
	}

	float getY() {
		return vy;
	}

	float getZ() {
		return vz;
	}

	void GRABBED() {
		isGrabbed = !isGrabbed;
	}

	void summon()
	{
		glLoadIdentity();

		/* 
		 * Colors are set by 6 possible values which was selected randomly in the declaration
		 * r for red
		 * g for green
		 * b for blue
		 * If the cube can be interacted with, tint the colors to be lighter.
		 */
		float r, g, b;
		if      (col == 0) r = 1, g = 0, b = 0;
		else if (col == 1) r = 0, g = 1, b = 0;
		else if (col == 2) r = 0, g = 0, b = 1;
		else if (col == 3) r = 1, g = 1, b = 0;
		else if (col == 4) r = 1, g = 0, b = 1;
		else               r = 0, g = 1, b = 1;

		if (canGrab) r = (r == 0) ? .8 : 1, g = (g == 0) ? .8 : 1, b = (b == 0) ? .8 : 1;
		
		glColor3f(r,g,b);

		glTranslated(vx, vy, vz);
		// EASTER EGG CONDITIONAL
		if (delightful) {
			glutSolidSphere(1.68,6,6);
			glColor3f(0.0, 0.0, 0.0);
			glutWireSphere(1.7,10,10);
		}
		else {
			glutSolidCube(2.9);
			glColor3f(0.0, 0.0, 0.0);
			glutWireCube(3.0);
		}
	}
};

/*
 * The main robot class.
 * The name comes from Patapon 3.
 */
class Destrobo {
	float x, y, z; //Location? Not the most useful.
	int arm1, arm2; //Arm rotation flags
	int rarm1 = 90, rarm2 = 45; // starting rotations
public:
	Destrobo(float xx, float yy, float zz) {
		x = xx;
		y = yy;
		z = zz;
		arm1 = 1;
		arm2 = -1;
	}

	void drawDestrobo() {
		glLoadIdentity();
		glColor3f(0.0, 1.0, 0.0);
		glTranslated(0, 0, DEPTH); //THEY MUST ALL BE NEGATIVE TWENTY
		glutWireCube(2.0); 
		glLoadIdentity();
		glColor3f(1.0, 0.0, 0.0);
		glTranslated(0, 0, -18);
		glutSolidCube(1.0);

		// show arm 1
		glLoadIdentity();
		glTranslated(1.5, 0, DEPTH);
		
		glRotated(rarm1, 1, 0, 0); // arm1 rotation
		
		glScaled(1, 1, 3);
		glutWireCube(1.0);

		//show arm 2
		glLoadIdentity();
		glTranslated(-1.5, 0, DEPTH);

		glRotated(rarm2, 1, 0, 0); // arm2 rotation

		glScaled(1, 1, 3);
		glutWireCube(1.0);
	}

	// this is called when we are pressing a movement button.
	void armsUpdate() {
		rarm1 = rarm1 + 2;
		rarm2 = rarm2 - 2;
	}
};

static Destrobo pata = Destrobo(0.0, 0.0, DEPTH);

//VECTOR OF CUBES
static vector<VoidCube> cubes;

void GreatSummoning() {
	for (int i = 0; i < cubes.size(); i++)
	{
		cubes.at(i).summon();
	}
}

void cubeUpdate() {
	for (int i = 0; i < cubes.size(); i++)
	{
		cubes.at(i).ShiftCube();
	}
}

void moveDir(unsigned char k, int x, int y)
{
	bool doArmSpin = false;
	//GO FOWARD
	if (k == 'w')
	{
		movY = movY - spd;
		cubeUpdate();
		movY = 0;
		gloY = gloY - 1;
		doArmSpin = true;
	}
	//GO LEFT
	else if (k == 'a')
	{
		movX = movX + spd;
		cubeUpdate();
		movX = 0;
		gloX = gloX + 1;
		doArmSpin = true;
	}
	//GO BACK
	else if (k == 's')
	{
		movY = movY + spd;
		cubeUpdate();
		movY = 0;
		gloY = gloY + 1;
		doArmSpin = true;
	}
	//GO RIGHT
	else if (k == 'd')
	{
		movX = movX - spd;
		cubeUpdate();
		movX = 0;
		gloX = gloX - 1;
		doArmSpin = true;
	}

	//GRAB FUNC
	else if (k == 'e') {
		for (int i = 0; i < cubes.size(); i++)
		{
			if (abs(cubes[i].getX()) < 2 && abs(cubes[i].getY()) <= 3 && abs(cubes[i].getY()) > 2 || abs(cubes[i].getY()) < 3 && abs(cubes[i].getX()) <= 3 && abs(cubes[i].getX()) > 2) {
				cubes[i].GRABBED();
			}
		}
	}
	
	// changes speed
	else if (k == '=') {
		spd *= 1.5;
	} else if (k == '-') {
		spd /= 1.5;
	}

	// easter egg code input
	else if (k == 't') {
		delightful = !delightful;
	}

	else {}

	if (doArmSpin) pata.armsUpdate();
}

void drawScene(void)
{
	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
	glEnable(GL_DEPTH_TEST);

	glRotated(15, 1, 0, 0);
	glPushMatrix();
	GreatSummoning();
	glPopMatrix();

	pata.drawDestrobo();

	glFlush();
}

// Initialization routine.
void setup(void)
{
	glClearColor(1.0, 1.0, 1.0, 0.0);

	// added for user friendliness!!! :D
	cout << "wasd to move\n= to increase robot speed\n- to decrease robot speed\nt for a surprise.\n";

	/*
	 * Width of a box is 3 in all directions.
	 * USE DEPTH to set z of VoidCube to DEPTH.
	 * DEPTH is DEFINED as an integer of -20.
	 */

	srand(time(NULL));

	// This makes a smiley face out of blocks
	cubes.push_back(VoidCube( -3,  6, DEPTH));
	cubes.push_back(VoidCube(  3,  6, DEPTH));
	cubes.push_back(VoidCube( -6, -3, DEPTH));
	cubes.push_back(VoidCube(  6, -3, DEPTH));
	cubes.push_back(VoidCube( -3, -6, DEPTH));
	cubes.push_back(VoidCube(  0, -6, DEPTH));
	cubes.push_back(VoidCube(  3, -6, DEPTH));

	// this makes a border wall between random and set things
	for(int i = -24; i <= 24; i+=3)
		for (int j = -24; j <= 24; j += 3) {
			if (j == -24 && !(i == j))
				cubes.push_back(VoidCube(i, j, DEPTH));
			else if (j == 24 && !(i == j))
				cubes.push_back(VoidCube(i, j, DEPTH));
			else if (i == -24 && !(i == j))
				cubes.push_back(VoidCube(i, j, DEPTH));
			else if (i == 24 && !(i == j))
				cubes.push_back(VoidCube(i, j, DEPTH));
		}

	// the randomly set blocks
	for (int i = -300; i <= 300; i += 3)
		for (int j = -300; j <= 300; j += 3) {
			if ((i < 30 && i > -30) && (j < 30 && j > -30)) continue;
			if (rand() % 20 == 0) cubes.push_back(VoidCube(i, j, DEPTH));
		}
}

// OpenGL window reshape routine.
void resize(int w, int h)
{
	glViewport(0, 0, w, h);
	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	glFrustum(-5, 5, -5, 5, 5, 500);
	gluLookAt(0, -7, 2, 0, -5, 0, 0, 1, 0);
	glMatrixMode(GL_MODELVIEW);
}

void refresh(int ms) {
	glutPostRedisplay();
	glutTimerFunc(ms, refresh, ms);
}

// Main routine.
int main(int argc, char **argv)
{
	glutInit(&argc, argv);

	glutInitContextVersion(4, 3);
	glutInitContextProfile(GLUT_COMPATIBILITY_PROFILE);

	glutInitDisplayMode(GLUT_SINGLE | GLUT_RGBA | GLUT_DEPTH);
	glutInitWindowSize(500, 500);
	glutInitWindowPosition(100, 100);
	glutCreateWindow("DESTROBO");
	glutDisplayFunc(drawScene);
	glutReshapeFunc(resize);
	glutKeyboardFunc(moveDir);
	glutTimerFunc(33, refresh, 33);

	glewExperimental = GL_TRUE;
	glewInit();

	setup();

	glutMainLoop();
}

/*
 * NOTES FOR THIS PROJECT
 *
 * KEYBOARD INPUT:
 * w moves robot forward
 * a moves robot left
 * s moves robot backwards
 * d moves robot right
 * 
 * = to increase speed of robot by 50%
 * - to decrease robot speed by 50%
 *
 * t for and easter egg (toggles whether blocks apear as cubes or spheres)
 */