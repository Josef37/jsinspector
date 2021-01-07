import React from 'react';
import { Link } from "react-router-dom"
import { apiRoot } from '../config';

const Home = () => {
    const [ids, setIds] = React.useState([])

    React.useEffect(() => {
        const fetchIds = async () => {
            const response = await fetch(`${apiRoot}/ids`)
            if (!response.ok) throw new Error('Failed fetching ids')
            const ids = await response.json()
            setIds(ids)
        }
        fetchIds()
    }, [])

    return <ul>{
        ids.map(id => <Item id={id} />)
    }</ul>
}

const Item = ({ id }) => {
    const [instances, setInstances] = React.useState(null)

    React.useEffect(() => {
        const fetchInstances = async () => {
            const response = await fetch(`${apiRoot}/item/${id}`)
            if (!response.ok) throw new Error(`Failed fetching item with id ${id}`)
            const item = await response.json()
            setInstances(item.instances)
        }
        fetchInstances()
    }, [id])

    return <li>
        <div>
            <Link to={`/${id}`}>{id}</Link>
        </div>
        {instances && <ul>{
            instances.map(({ path, lines }) =>
                <li>{path}:{lines[0]},{lines[1]}</li>
            )
        }</ul>}
    </li>
}

export default Home;