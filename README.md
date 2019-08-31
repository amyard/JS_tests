npm init   ---   создаст файл, куда будем сохранять все нужные скрипты
npm install node-sass --save-dev   ---   устанавливаем sass
npm install jquery --save   ---   jquery install
npm uninstall jquery --save   ---   delete

npm install   ---   установка всех скриптов в папку node_modules


1.  в package.json прописываем 

    "scripts": {
        "compile:sass": "node-sass sass/main.scss css/style.css"
    },
    и в терминале прописываем:
    npm run compile:sass
    RESULT: scss file converted to css file.

2.  "scripts": {
        "compile:sass": "node-sass sass/main.scss css/style.css -w"
    },
    и в терминале прописываем:
    npm run compile:sass -w
    RESULT: автоматом будет обновлять css пока запущен терминал.

3.  
"compile:sass": "node-sass sass/main.scss css/style.comp.css",
    "prefix:css": "postcss --use autoprefixer -b 'last 10 versions' css/style.comp.css -o css/style.prefix.css",
    "compress:css": "node-sass css/style.prefix.css css/style.css --output-style compressed",
    "build:css": "npm-run-all compile:sass prefix:css compress:css"

---- make compress css
