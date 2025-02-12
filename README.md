# ☕ 好日子咖啡輕食 RIZI COFE HOUSE

Vue 3 + Vite + Pinis + TypeScript
  
   👉 如何運行專案

1. `yarn | npm install`  
2. `yarn dev | npm run dev`

# 開發規範

-  命名規則  

    | 檔愛類型 | 命名類型 | 範例 |
    | ------ | ------ | ------ |
    | 一般命名 | 小駝峰 | helloWord |
    | 常量命名 | 大寫加底線 |HELLO_WORD |
    | d.ts檔命名 | 烤肉串 | hello-word |
    | vue檔命名 | 大駝峰 | HelloWord |
    | 型別命名 | 大駝峰 | HelloWord |
    
-  縮寫規則  

    超出[此表](https://blog.csdn.net/wf19930209/article/details/78577918)的字彙，請完整書寫
    
-  排版規則  

    空格 : 2  
    其他請安裝Eslint，規範皆設置完成  
    檢查兼自動修正`yarn lint | npm run lint`  
    
    - 若使用VSCode，可添加以下設定至 setting.json 
    ~~~
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
         "source.fixAll": "always"
     },
     "eslint.validate": [
         "javascript",
         "vue"
     ],
     "editor.tabSize": 2,
     "editor.indentSize": "tabSize",
     "editor.detectIndentation": false,
     ~~~

-  註解規則 

    若需註解，請務必加上說明
    