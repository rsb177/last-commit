function isGithubRepo(link){
    //Verify it looks like a repo & the link has outerText
    const regex = /github\.com\/[^/]*\/[^/]*\/{0,1}$/gm;
    return (regex.test(link.href) && link.outerText)
}

function addShield(link){
    var url = link.pathname.split('/')
    var user = url[1]
    var project = url[2]

    /* if (!(user && project)){
        console.log('href:${} ')
    } */

    var shield = `&nbsp;<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/${user}/${project}?style=flat-square">`
    link.insertAdjacentHTML('afterend',shield)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


async function getGithubCommits(){
    //find hyperlinks to github repos, expecting the format github.com/[user]/[repo]/
    links = document.querySelectorAll('a[href^="https://github.com/"]')

    for (link of links){
        if (isGithubRepo(link)){
            addShield(link);
            await sleep(300);
        }
    }
}

getGithubCommits();
