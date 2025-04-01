from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def sumar_matrices(matriz1, matriz2):
    return [[matriz1[i][j] + matriz2[i][j] for j in range(len(matriz1[0]))] for i in range(len(matriz1))]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sumar', methods=['POST'])
def sumar():
    datos = request.get_json()
    matriz1 = datos.get('matriz1')
    matriz2 = datos.get('matriz2')
    
    if not matriz1 or not matriz2:
        return jsonify({'error': 'Datos inválidos'}), 400
    
    resultado = sumar_matrices(matriz1, matriz2)
    return jsonify({'resultado': resultado})

if __name__ == '__main__':
    app.run(debug=True)
