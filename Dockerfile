FROM node:20.5.1-slim

USER node

WORKDIR /home/node/app

CMD ["tail", "-f", "/dev/null"] 
#tail -f /dev/null - fica lendo o dispositvo nulo do linux mantendo de pé