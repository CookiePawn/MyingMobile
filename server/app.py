import os
import matplotlib.pyplot as plt
from flask import Flask, send_from_directory, jsonify, request
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input, decode_predictions
from tensorflow.keras.preprocessing import image
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 모든 origin에서의 요청 허용

# Matplotlib 백엔드 설정
import matplotlib
matplotlib.use('Agg')  # 백그라운드에서 실행되도록 설정

app = Flask(__name__)

# 미리 학습된 MobileNetV2 모델 로드
model = MobileNetV2(weights='imagenet')

# 'static' 디렉토리 경로 설정
static_dir = os.path.join(os.path.dirname(__file__), 'static')

@app.route('/')
def index():
    return (
        "<h1>Welcome!</h1>"
    )



@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(static_dir, filename)



@app.route('/someEndpoint', methods=['GET'])
def some_endpoint():
    # 데이터를 생성하거나 가져오는 로직을 수행하고 JSON으로 변환
    data = {"message": "Hello from Flask!"}
    return jsonify(data)





@app.route('/predictTopPrediction', methods=['GET'])
def predict_top_prediction():
    # 예측을 수행할 이미지 로드 및 전처리
    img_path = './img/userImg.jpg'  # 예측할 이미지 파일 경로 (이 코드와 같은 디렉토리에 이미지를 위치시킵니다)
    img = image.load_img(img_path, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)

    # 이미지 출력
    plt.imshow(img)
    plt.axis('off')  # 축 정보 제거

    # 이미지를 파일로 저장 (옵션)
    result_img_path = 'static/result.png'
    plt.savefig(result_img_path)

    # 이미지 예측
    predictions = model.predict(x)
    decoded_predictions = decode_predictions(predictions, top=5)[0]  # 상위 5개 예측 결과

    # 가장 높은 확률의 예측 결과 가져오기
    top1_prediction = decoded_predictions[0]
    top2_prediction = decoded_predictions[1]
    top3_prediction = decoded_predictions[2]
    top4_prediction = decoded_predictions[3]
    top5_prediction = decoded_predictions[4]

    # JSON 형식으로 응답 데이터 구성
    response_data = { 
        "label1_1": f'{top1_prediction[1]}',
        "label1_2": f'({top1_prediction[2]*100:.2f}%)',
        "label2_1": f'{top2_prediction[1]}',
        "label2_2": f'({top2_prediction[2]*100:.2f}%)',
        "label3_1": f'{top3_prediction[1]}',
        "label3_2": f'({top3_prediction[2]*100:.2f}%)',
        "label4_1": f'{top4_prediction[1]}',
        "label4_2": f'({top4_prediction[2]*100:.2f}%)',
        "label5_1": f'{top5_prediction[1]}',
        "label5_2": f'({top5_prediction[2]*100:.2f}%)',
    }

    # JSON 응답 반환
    return jsonify(response_data)



# 이미지 업로드 받기
@app.route('/upload', methods=['POST'])
def upload():
    if 'photo' in request.files:
        photo = request.files['photo']
        # 여기에서 업로드된 사진을 원하는 위치에 저장하거나 처리합니다.
        photo.save('./img/userImg.jpg')
        return jsonify({'message': '사진 업로드 완료'})
    else:
        return jsonify({'error': '사진이 업로드되지 않았습니다.'})







if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)