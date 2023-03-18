// github相关的查询
import axios from "axios";

const config = {
    clientID: "c788d2e29e093f561bbf",
    clientSecret: "7d6ce6ca2de7654f3b2548af8689de8d2c154b3e",
    repo: "comments",
    owner: "aoeba",
    labels: ['Gitalk']
};

const axiosGithub = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        'Accept': 'application/json'
    }
})

function getIssueByLabels(id) {
    const { owner, repo, labels, clientID, clientSecret } = config

    return new Promise((resolve, reject) => {
        axiosGithub.get(`/repos/${owner}/${repo}/issues`, {
            auth: {
                username: clientID,
                password: clientSecret
            },
            params: {
                labels: labels.concat(id).join(','),
                t: Date.now()
            }
        }).then(res => {
            let issue = null
            if (!(res && res.data && res.data.length)) {
                reject("未查询到issue")
            } else {
                issue = res.data[0]
                resolve(issue)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

// Get comments via v3 api, don't require login, but sorting feature is disable
export function getCommentsV3(id) {
    const { clientID, clientSecret } = config
    return new Promise((resolve, reject) => {
        getIssueByLabels(id).then(issue => {
            axiosGithub.get(issue.comments_url, {
                headers: {
                    Accept: 'application/vnd.github.v3.full+json'
                },
                auth: {
                    username: clientID,
                    password: clientSecret
                }
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        }).catch(err => {
            reject(err)
        })
    })
}