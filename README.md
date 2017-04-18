今天给大家讲一讲怎么使用git上传自己的项目到GitHub上。
首先要有一个GitHub的账号，其官方网站是https://github.com/  

2.注册好账号后登陆自己的github账号，登陆成功后的界面

3.接下来就是创建仓库，我现在创建一个交github-git的测试仓库，仓库分为公开的和私有的，私有的是收费的，公开的是免费的，我使用的是公开仓库，创建方式如下：

4.点击New repository 按钮，弹出如下界面，第一行填你的仓库名，第二行是对这个仓库的描述（可不填），接下来选择公有和私有，再然后是README，这里是写一些介绍该项目的功能之类的东西。最后点击Create repository按钮，创建好了一个仓库。

5.创建仓库成功后,界面如下显示,可以点击README.md来编译这个文件

代码仓库已经创建好，接下来要教大家怎么使用git上传代码到你的代码仓库
根据自己的电脑操作系统安装git
下下载网址: http://git-scm.com/download/
下载完毕后，打开安装，直到安装完毕。
怎么使用git
配置git
打开git界面，shift+鼠标右键    点击Git Bash Here。得到的界面如下

a)    先输入ssh-keygen–t rsa –C “邮箱地址”,注意ssh-keygen之间是没有空格的,其他的之间是有空格的。
b)    回车之后,会出现一行,让你输入一个保存密钥的地方,括号里面是它默认的位置，这里会让你输入几次内容，都不用输入，直接回车就可以了，可以看到如图的效果（这里最好都不要输入，直接回车，我第一次更改了保存的路径，就出了问题，少了一个文件）。

c)   回车之后,这样密钥就生成了,可以打开id_rsa.pub（位置根据你的电脑来看）来查看,里面的所有内容就是这个密钥,一会需要使用的时候,就直接全选复制就可以了
d)   现在转到github网站上去配置一下ssh key,点击箭头指示的三角图标，选择Settings，然后点击左侧的SSH Keys，之后点击右侧的Add SSH Key，这样就会出现添加SSH Key的界面，在Title这一栏填一个名字，名字随意起，之后打开刚才生成的那个文件id_rsa.pub，全选复制里面的内容到Key这一栏中，点击Add Key按钮完成操作，这时你填的邮箱会收到一封确认的邮件，不用管它



e)  验证一下是否设置成功,在gitbash下输入如下命令：ssh –T git@github.com
如果你是第一次，会让你输入yes或no,这时输入yes就可以了，其它显示就和我这个是一样的。如果你的是出现不是这些内容，有可能是显示权限问题什么的，就应该是我上面提到的那种情况，你看一下你生成密钥时是否操作正确，目录下是否有那个known_hosts这个文件

f)  现在配置一下用户名和邮箱：
git config –global user.name "用户名"
git config –global user.email "邮箱"
3. 到现在为止，我们就算把Git和github配置完了，现在就来托管我们的项目吧，刚才我们已经在github上面创建了一个仓库，那么我们现在就在本地创建一个test文件夹，来管理这个仓库。点击该文件夹，然后shift+右键 点击 Git Bush Here

4.这时候输入 git init，来完成初始化工作。这时候目录里面就多了一个.git的目录了。继续执行git remote add origin https://github.com/awaylee/github-git-
其中https://github.com/awaylee/github-git-是你代码仓库的地址，在地址栏复制即可

或者点击Create or download 然后复制其地址

最后我们将pull代码仓库里的东西到本地，直接执行
git pull https://github.com/awaylee/github-git-

这时候文件夹中就多了一个

如果不用以上方法同步代码的话可以直接在一个盘中执行代码
git clone https://github.com/awaylee/github-git-

得到的文件


5.代码我们已经clone下来，接下来就是我们修改了本地代码再上传到远程仓库中去，这里我新建了一个test文本文件

接下来我们需要上传上去
在test这个地址 shift+右键 点击 Git Bash Here，然后执行git add . 或者
git add -A (这里的. 和-A 都是指全部文件) 然后 git commit -m "写本次提交内容的信息"

-m后面跟提示信息，这个提示信息是一定要写的，不仅是规则，同时也方便我们记录我们提交的过程，写清晰为什么提交或修改了什么，方便我们以后检查，提交完成后，我们就要把它推送到远程仓库上去了，命令如下：
git push https://github.com/awaylee/github-git-

然后自己在github上创建的代码仓库就多了个test文件，如下图

做到这里基本上所有的流程都已经完成了，如果需要修改代码再提交的话重复步骤5即可。
每次增加了新文件就先add，然后commit，如果只是改了文件的内容，只执行commit就行了，当然最后一步都是要执行push啦。
END
