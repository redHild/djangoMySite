#include <GL/freeglut.h>
#include <cmath>
#include <vector>
#include <iostream>
#include <string>

using namespace std;

#define pi 3.14159

void setup() {
	glClearColor(0.0, 0.0, 0.0, 1.0); // background color
	glMatrixMode(GL_PROJECTION); // Mapping our Matrix
	glLoadIdentity();
	gluOrtho2D(-100.0, 100.0, -100.0, 100.0); // setting up the System for specified dimensions (0 - 100, 0 - 100)
}

void drawText(string text, float x, float y) {
	glRasterPos2i(x, y);
	for (int i = 0; i < text.size(); i++)
		glutBitmapCharacter(GLUT_BITMAP_TIMES_ROMAN_24, text[i]);
}

void drawCircle(float x, float y, float s, int sides) {
	glBegin(GL_LINE_LOOP);
	for (float r = 0; r < 2; r += (2.0 / sides)) {
		glVertex2f(x + (cos(r * pi)*s), (y + sin(r * pi)*s));
	}
	glEnd();
}

void drawCardioid(float x, float y, float s, int sides, int mult) {
	vector<float> points = vector<float>();
	for (float r = 0; r < 2; r += (2.0 / sides))
		points.push_back(r*pi);
	for (int i = 0; i < points.size(); i++) {
		glBegin(GL_LINES);
		float cr = points[i];
		float nr = points[(i*mult)%sides];
		glVertex2f(x + (cos(cr)*s), (y + sin(cr)*s));
		glVertex2f(x + (cos(nr)*s), (y + sin(nr)*s));
		glEnd();
	}
}

int gsides = 20;
int multiplier = 2;
float r = 1.0, g = 1.0, b = 1.0;

void draw() { // no return type, no params
	glClear(GL_COLOR_BUFFER_BIT);
	float size = 90;

	drawCircle(0,0,size,gsides);

	glColor3f(r, g, b);
	drawCardioid(0, 0, size, gsides, multiplier);

	string sidesText = "Sides(- and +): " + to_string(gsides);
	drawText(sidesText,-95,-85);

	string multText = "Multiplier(< and >): " + to_string(multiplier);
	drawText(multText, -95, -95);

	glFlush(); // Bring everything that was calculated to the screen
}

void keyboardFunc(unsigned char key, int x, int y) {
	if (key == '=') { 
		gsides += 1;
		glutPostRedisplay();
	}
	if (key == '-') {
		gsides -= (gsides - 1 > 0) ? 1 : 0;
		glutPostRedisplay();
	}
	if (key == ',') {
		multiplier -= (multiplier - 1 >= 0) ? 1 : 0;
		glutPostRedisplay();
	}
	if (key == '.') {
		multiplier += 1;
		glutPostRedisplay();
	}
	if (key == 'q') {
		r += (r + 0.1 <= 1) ? 0.1 : 0;
		glutPostRedisplay();
	}
	if (key == 'w') {
		g += (g + 0.1 <= 1) ? 0.1 : 0;
		glutPostRedisplay();
	}
	if (key == 'e') {
		b += (b + 0.1 <= 1) ? 0.1 : 0;
		glutPostRedisplay();
	}
	if (key == 'a') {
		r -= (r - 0.1 >= 0) ? 0.1 : 0;
		glutPostRedisplay();
	}
	if (key == 's') {
		g -= (g - 0.1 >= 0) ? 0.1 : 0;
		glutPostRedisplay();
	}
	if (key == 'd') {
		b -= (b - 0.1 >= 0) ? 0.1 : 0;
		glutPostRedisplay();
	}
}

int main(int argc, char **argv) {
	glutInit(&argc, argv);
	glutInitContextVersion(4, 3); // Software Version
	glutInitContextProfile(GLUT_COMPATIBILITY_PROFILE);

	glutInitDisplayMode(GLUT_SINGLE | GLUT_RGBA); // single image , red green blue alpha

	glutInitWindowSize(800, 800); // window size

	glutInitWindowPosition(0, 0); // Where the window appears

	glutCreateWindow("Cardioid"); // Create window along with a name, needs some sort of string
	setup();

	glutDisplayFunc(draw); // draw desired function
	glutKeyboardFunc(keyboardFunc);

	glutMainLoop();
}

