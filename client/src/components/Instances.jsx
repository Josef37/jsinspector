import React from 'react';
import { Link } from 'react-router-dom';
import { apiRoot } from '../config';
import Diff from './Diff';

const Instances = ({ id }) => {
    const [instances, setInstances] = React.useState(null)
    const [selected, setSelected] = React.useState([0, 1])
    const [diff, setDiff] = React.useState("")

    React.useEffect(() => {
        const fetchInstances = async () => {
            const response = await fetch(`${apiRoot}/item/${id}`)
            if (!response.ok) throw new Error(`Failed fetching item with id ${id}`)
            const item = await response.json()
            setInstances(item.instances)
        }
        fetchInstances()
    }, [id])

    React.useEffect(() => {
        const fetchDiff = async () => {
            const response = await fetch(`${apiRoot}/item/diff/${id}/${selected[0]}/${selected[1]}`)
            if (!response.ok) throw new Error(`Failed fetching diff for item ${id}, instances ${selected[0]} and {selected[1]}`)
            const diff = await response.text()
            setDiff(diff)
        }
        if (selected.length === 2) fetchDiff()
    }, [id, selected])

    const handleSelect = (index) => {
        setDiff("")
        if (isSelected(index)) {
            setSelected(selected => selected.filter(i => i !== index))
        } else {
            setSelected(selected => selected.concat(index))
        }
    }

    const isSelected = (index) => selected.includes(index)

    return <div>
        <Link to="/" style={{ margin: 30, display: "block" }}>
            Back to overview
        </Link>
        {instances &&
            <div style={{ margin: 30 }}>{
                instances.map(({ path, lines }, i) =>
                    <div key={i} >
                        <label style={{ backgroundColor: isSelected(i) ? 'lightgreen' : 'transparent' }}>
                            <input type="checkbox" checked={isSelected(i)} onChange={() => handleSelect(i)} />
                            {path}:{lines[0]},{lines[1]}
                        </label>
                    </div>
                )
            }</div>
        }
        {diff && selected.length === 2 &&
            <Diff diff={diff} />
        }
    </div>
}

export default Instances;