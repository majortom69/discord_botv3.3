#include <iostream>
#include <cmath>
#include <stdlib.h>
#include <sstream>
#include <string>
#include <iomanip>



void prMx(int a, int b, std::string** printMatrix) {
	for (int i = 0; i < b; i++) {
		for (int j = 0; j < a; j++) {
			
			std::cout << printMatrix[j][i] << '\t';
		}
		std::cout << '\n';
	}
}

void swapRows(int rows, int cols, float** matrix, int col1, int col2) {
	for (int k = 0; k < rows; k++) {
		float temp = matrix[col1][k];
		matrix[col1][k] = matrix[col2][k];
		matrix[col2][k] = temp;
	}
}

void poopmx(int n, int i, int j, int k, float** matrix) {

}

/*Этот алгоритм - говно полное. не использовать*/
void triangMx(int rows, int cols, float** matrix) {
	/*Этот алгоритм - говно полное. не использовать*/
	int lead = 0;

	/*Перейдите к следующему столбцу и повторите шаги 2 - 4 для этого столбца
	и всех следующих столбцов, пока не будете иметь ступенчатый вид матрицы.*/
	for (int r = 0; r < rows; r++) {
		if (cols <= lead) {
			break;
		}
		
		int i = r;

		/*Выбираем первый столбец и находим первый ненулевой элемент(если он есть).
		Обозначить этот элемент как "лидер".*/
		while (matrix[i][lead] == 0) {
			i++;
			if (rows == i) {
				i = r;
				lead++;
				if (cols == lead) {
					return;
				}
			}
		}

		/*Если лидер находится не в первой строке матрицы, поменяйте местами строки,
		чтобы лидер оказался в первой строке.*/
		swapRows(rows, cols, matrix, i, r);
		

		/*2
		  0 / 4
		  4*/
		/*Используйте элементарные преобразования строк, чтобы сделать все элементы под лидером равными нулю.
		Для этого вычтите из каждой строки над лидером умноженную на коэффициент такую, 
		что элемент под лидером становится равным нулю.*/
		float lv = matrix[r][lead];
		for (int j = 0; j < cols; j++) {
			matrix[r][j] /= lv;
		}
		for (int i = 0; i < rows; i++) {
			if (i != r) {
				float lv = matrix[i][lead];
				for (int j = 0; i < cols; j++) {
					matrix[i][j] -= lv * matrix[r][j];
				}
			}
		}
		lead++;
	}
	
}

//void test(int a, int b, double **matrix ) {
//	int lead = 0;
//	for(int r = 0; r < a; r++){ }
//}


int main()
{
	int rows, cols;
	std::cout << "Enter size of mateix: ";
	std::cin >> rows >> cols;
	// матрица для вычислений
	float** matrix = new float*[rows];
	for (int i = 0; i < rows; i++) {
		matrix[i] = new float[cols];
	}

	// матрица для визуализации 
	std::string** printMatrix = new std::string * [rows]; //поменять на stringstream, если крашиться
	for (int i = 0; i < rows; i++) {
		printMatrix[i] = new std::string[cols];
	}
	

	for (int i = 0; i < cols; i++) {
		for (int j = 0; j < rows; j++) {
			std::stringstream ss;
			ss << "i" << j + 1 << "j" << i + 1;
			std::string str = ss.str();
			printMatrix[j][i] = str;
		}
	}
	system("cls");

	prMx(cols, rows, printMatrix);

	for (int i = 0; i < cols; i++) {
		for (int j = 0; j < rows; j++) {
			float input;
			std::cin >> input;
			matrix[j][i] = input;
			std::string s = std::to_string(input);
			printMatrix[j][i] = s;
			system("cls");
			prMx(cols, rows, printMatrix);
		}
	}

	triangMx(rows, cols, matrix);
	for (int i = 0; i < cols; i++) {
		for (int j = 0; j < rows; j++) {
			std::cout << matrix[j][i] << '\t';
		}
		std::cout << '\n';
	}

	


	//clean up
	for (int i = 0; i < cols; i++) {
		delete[] matrix[i];
	}
	delete[] matrix;
	for (int i = 0; i < cols; i++) {
		delete[] printMatrix[i];
	}
	delete[] printMatrix;


	std::cin.get();
	return 0;
}