FROM node:12.18.3-alpine

# Minha pasta de tabalho onde vou trabalhar no linux
WORKDIR /USR/FEEDBACKZON_API

# copio o arquivo principal da minha pasta para a raiz do meu server da pasta de trabalho
COPY package*json ./

# rodo o npm install do meu workdir
RUN npm i

# copio os arquivos do meu fonte para o workdir
COPY . .

# Deixo ouvindo na porta 3335
EXPOSE 3335

# # Subo o server
# ENTRYPOINT [ "npm", "start" ]
