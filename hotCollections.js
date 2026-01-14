import axios from 'axios'

async function fetchUsers() {
    try {

        const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
        console.log(response.data)
        
    }
}