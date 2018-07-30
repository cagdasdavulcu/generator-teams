module.exports=function(t){var e={};function i(o){if(e[o])return e[o].exports;var s=e[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=t,i.c=e,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(o,s,function(e){return t[e]}.bind(null,s));return o},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=8)}([function(t,e){t.exports=require("path")},function(t,e){t.exports=require("yeoman-generator")},function(t,e){t.exports=require("lodash")},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=i(4);let s=i(0);const n="package.json";e.Yotilities=class{static validateUrl(t){return/(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(t)}static fixFileNames(t,e){if(void 0!==t){var i=s.basename(t);if("_"===i[0]){t="."+i.substr(1);var o=s.dirname(t);t=s.join(o,t)}for(var n in e)e.hasOwnProperty(n)&&"string"==typeof e[n]&&(t=t.replace(new RegExp("{"+n+"}","g"),e[n]))}return t}static addAdditionalDeps(t,e){var i=e.readJSON(n);t.forEach(t=>{i.dependencies[t[0]]=t[1]}),e.writeJSON(n,i)}static insertTsExportDeclaration(t,e,i,s){let n=s.read(t);const a=o.createSourceFile(t,n,o.ScriptTarget.ES5,!0,o.ScriptKind.TS),r=o.createExportDeclaration(void 0,void 0,void 0,o.createLiteral(e));void 0!==i&&o.addSyntheticLeadingComment(r,o.SyntaxKind.SingleLineCommentTrivia,` ${i}`);const p=o.updateSourceFileNode(a,[...a.statements,r]),c=o.createPrinter({newLine:o.NewLineKind.LineFeed,removeComments:!1});s.write(t,c.printFile(p))}}},function(t,e){t.exports=require("typescript")},function(t,e){t.exports=require("yosay")},function(t,e){t.exports=require("guid")},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.GeneratorTeamsAppOptions=class{constructor(){this.botid="",this.botType="",this.connectorType="",this.messageExtensionType=""}}},function(t,e,i){t.exports=i(9)},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=i(10);t.exports=o.GeneratorTeamsApp},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=i(1),s=i(2),n=i(11),a=i(7),r=i(3),p=i(12);let c=i(5),l=(i(0),i(13)),u=i(6);e.GeneratorTeamsApp=class extends o{constructor(t,e){super(t,!(e.force=!0)||e),this.options=new a.GeneratorTeamsAppOptions,e.force=!0,this.desc("Generate a Microsoft Teams application."),this.argument("solutionName",{description:"Solution name, as well as folder name",required:!1}),this.option("skip-install",{type:Boolean,default:!1,description:"Skips running npm install"}),p.setup("6d773b93-ff70-45c5-907c-8edae9bf90eb"),delete p.defaultClient.context.tags["ai.cloud.roleInstance"],p.Configuration.setAutoCollectExceptions(!0),p.Configuration.setAutoCollectPerformance(!0),p.defaultClient.commonProperties={version:l.version},p.defaultClient.trackEvent({name:"start-generator"}),this.options.existingManifest=this.fs.readJSON("./src/manifest/manifest.json")}initializing(){this.log(c("Welcome to the "+n.default.yellow(`Microsoft Teams App generator (${l.version})`))),this.composeWith("teams:tab",{options:this.options}),this.composeWith("teams:bot",{options:this.options}),this.composeWith("teams:custombot",{options:this.options}),this.composeWith("teams:connector",{options:this.options}),this.composeWith("teams:messageExtension",{options:this.options}),this.options.existingManifest&&"https://statics.teams.microsoft.com/sdk/v1.2/manifest/MicrosoftTeams.schema.json"!=this.options.existingManifest.$schema&&(this.log(n.default.red("You are running the generator on an already existing project, but on a non supported-schema.")),process.exit(1))}prompting(){return this.prompt([{type:"confirm",name:"confirmedAdd",default:!1,message:`You are running the generator on an already existing project, "${this.options.existingManifest&&this.options.existingManifest.name.short}", are you sure you want to continue?`,when:()=>this.options.existingManifest},{type:"input",name:"solutionName",default:s.kebabCase(this.appname),when:()=>!(this.options.solutionName||this.options.existingManifest),message:"What is your solution name?"},{type:"list",name:"whichFolder",default:"current",when:()=>!(this.options.solutionName||this.options.existingManifest),message:"Where do you want to place the files?",choices:[{name:"Use the current folder",value:"current"},{name:"Create a subfolder with solution name",value:"subdir"}]},{type:"input",name:"name",message:"Title of your Microsoft Teams App project?",when:()=>!this.options.existingManifest,default:this.appname},{type:"input",name:"developer",message:"Your (company) name? (max 32 characters)",default:this.user.git.name,validate:t=>t.length>0&&t.length<=32,when:()=>!this.options.existingManifest,store:!0},{type:"checkbox",message:"What do you want to add to your project?",name:"parts",choices:[{name:"A Tab",value:"tab",checked:!0},{name:"A Bot",value:"bot"},{name:"An Outgoing Webhook",value:"custombot"},{name:"A Connector",value:"connector"},{name:"A Message Extension",value:"messageextension"}],when:t=>0!=t.confirmedAdd},{type:"input",name:"host",message:"The URL where you will host this solution?",default:t=>`https://${s.camelCase(t.solutionName)}.azurewebsites.net`,validate:r.Yotilities.validateUrl,when:()=>!this.options.existingManifest}]).then(t=>{if(0==t.confirmedAdd&&process.exit(0),this.options.existingManifest){this.options.developer=this.options.existingManifest.developer.name,this.options.title=this.options.existingManifest.name.short;let t=this.fs.readJSON("./package.json");this.options.libraryName=t.name,this.options.host=this.options.existingManifest.developer.websiteUrl}else{t.host=t.host.endsWith("/")?t.host.substr(0,t.host.length-1):t.host,this.options.title=t.name,this.options.description=this.description,this.options.solutionName=this.options.solutionName||t.solutionName,this.options.shouldUseSubDir="subdir"===t.whichFolder,this.options.libraryName=s.camelCase(this.options.solutionName),this.options.packageName=this.options.libraryName.toLocaleLowerCase(),this.options.developer=t.developer,this.options.host=t.host;var e=this.options.host.substring(this.options.host.indexOf("://")+3).split(".");this.options.namespace=s.reverse(e).join("."),this.options.tou=t.host+"/tou.html",this.options.privacy=t.host+"/privacy.html",this.options.id=u.raw(),this.options.host.indexOf("azurewebsites.net")>=0?this.options.websitePrefix=this.options.host.substring(this.options.host.indexOf("://")+3,this.options.host.indexOf(".")):this.options.websitePrefix="[your Azure web app name]",this.options.shouldUseSubDir&&this.destinationRoot(this.destinationPath(this.options.solutionName))}this.options.bot=-1!=t.parts.indexOf("bot"),this.options.tab=-1!=t.parts.indexOf("tab"),this.options.connector=-1!=t.parts.indexOf("connector"),this.options.customBot=-1!=t.parts.indexOf("custombot"),this.options.messageExtension=-1!=t.parts.indexOf("messageextension"),this.options.reactComponents=!1})}configuring(){}default(){}writing(){if(!this.options.existingManifest){let t=["_gitignore","tsconfig.json","tsconfig-client.json","src/manifest/icon-outline.png","src/manifest/icon-color.png","src/app/web/assets/icon.png","deploy.cmd","_deployment","src/app/TeamsAppsComponents.ts"],e=["README.md","gulpfile.js","package.json",".env","src/app/server.ts","src/manifest/manifest.json","webpack.config.js","src/app/scripts/client.ts","src/app/web/index.html","src/app/web/tou.html","src/app/web/privacy.html"];this.sourceRoot(),e.forEach(t=>{this.fs.copyTpl(this.templatePath(t),r.Yotilities.fixFileNames(t,this.options),this.options)}),t.forEach(t=>{this.fs.copy(this.templatePath(t),r.Yotilities.fixFileNames(t,this.options))}),this.options.reactComponents&&r.Yotilities.addAdditionalDeps([["msteams-react-base-component","^0.0.3"]],this.fs)}}conflicts(){}install(){this.options.existingManifest&&p.defaultClient.trackEvent({name:"rerun-generator"}),p.defaultClient.trackEvent({name:"end-generator"}),this.options.bot&&(p.defaultClient.trackEvent({name:"bot"}),"existing"==this.options.botType?p.defaultClient.trackEvent({name:"bot-existing"}):p.defaultClient.trackEvent({name:"bot-new"})),this.options.messageExtension&&p.defaultClient.trackEvent({name:"messageExtension"}),this.options.connector&&p.defaultClient.trackEvent({name:"connector"}),this.options.customBot&&p.defaultClient.trackEvent({name:"outgoingWebhook"}),this.options.staticTab&&p.defaultClient.trackEvent({name:"staticTab"}),this.options.tab&&p.defaultClient.trackEvent({name:"tab"}),p.defaultClient.flush(),this.options["skip-install"]?this.log(n.default.yellow('Skipping installation of dependencies. You should run "npm install"')):this.npmInstall()}end(){this.log(n.default.yellow("Thanks for using the generator!")),this.log(n.default.yellow("Have fun and make great Microsoft Teams Apps..."))}}},function(t,e){t.exports=require("chalk")},function(t,e){t.exports=require("applicationinsights")},function(t){t.exports={name:"generator-teams",version:"2.5.0-preview2",description:"Yeoman generator for Microsoft Teams Apps",main:"generators/app/index.js",scripts:{build:"node_modules/.bin/webpack"},files:["generators"],repository:{type:"git",url:"https://github.com/OfficeDev/generator-teams.git"},bugs:{url:"https://github.com/OfficeDev/generator-teams/issues"},homepage:"https://github.com/OfficeDev/generator-teams",keywords:["yeoman-generator","Microsoft Teams","microsoft-teams","Office 365","office-365","bot","bot-framework","botbuilder","chatbot"],author:"Wictor Wilén (wictor@wictorwilen.se)",maintainers:[{name:"Wictor Wilén",email:"wictor@wictorwilen.se",url:"http://www.wictorwilen.se"},{name:"Bill Bliss",email:"billbl@microsoft.com",url:"https://github.com/billbliss"}],license:"MIT",devDependencies:{"@types/lodash":"^4.14.104","@types/yeoman-generator":"^2.0.1","@types/yosay":"0.0.29","clean-webpack-plugin":"^0.1.18","copy-webpack-plugin":"^4.5.0","ts-loader":"^4.4.2",typescript:"^2.6.1",webpack:"^4.16.3","webpack-cli":"^3.1.0"},dependencies:{applicationinsights:"^1.0.2",chalk:"^2.3.2",guid:"0.0.12",lodash:"^4.17.5","yeoman-generator":"^3.1.1",yosay:"^2.0.1"}}}]);