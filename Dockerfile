FROM node
# 해당 이미지 내에서 현재 경로를 /app으로 설정 
#호스트에서 이미지로 파일을 전부 복사 
WORKDIR /frontend
COPY . ./
RUN npm i
CMD ["npm", "run", "dev"]