let username = document.getElementById('input-search')

const infoUser = document.getElementById('profile')

const searchUser = document.getElementById('btn-search')


async function getUser() {
    const response = await fetch(`https://api.github.com/users/${username}`)
    const data = await response.json()
    return data
}
async function getEvents() {
    const response = await fetch(`https://api.github.com/users/${username}/events`)
    const data = await response.json()
    return data
}


async function getRepositories() {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=10`)
    const data = await response.json()
    return data
}


function getProfile() {
    getUser(username).then(dataUser => {
        infoUser.innerHTML = `<img src="${dataUser.avatar_url}" />
                              <div class="profile-data"
                              <h1>${dataUser.name}</h1>
                              <h5>${dataUser.login}</h5>
                              <p>${dataUser.bio ?? 'Não tem bio.'}</p>
                              </div>
                              
                              <div class="follows">
                              <p>Seguidores ${dataUser.followers}</p>
                              <p>Seguindo ${dataUser.following}</p>
                              </div>`

    })

    getEvents().then(events => {
        events.map(event => {
            if (event.type === "PushEvent") {
                infoUser.innerHTML += `
                <ul>
                <li>${event.repo.name} - ${event.payload.commits[0].message}</li>
                </ul>`
            } else {
                infoUser.innerHTML += `
                <ul>
                <li>${event.repo.name} - Sem mensagem de commit</li>
                </ul>`
            }
        })
    })

    getRepositories().then(repoStats => {
        repoStats.map(stats => {
            infoUser.innerHTML += `
            <ul>
            <li>🍴 ${stats.forks_count} - 👀 ${stats.watchers_count} - ⭐ ${stats.stargazers_count} - 💭 ${stats.language}</li>
            </ul>`
        })
    })
}
username.addEventListener('keyup', (e) => {
    username = e.target.value
})

searchUser.addEventListener('click', getProfile)
