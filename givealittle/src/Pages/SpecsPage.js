import Spec from "../components/Spec";
import { useState} from 'react'

import React from 'react'

function SpecsPage() {

    const [specName, setSpecName] = useState("");
    const [specDetail, setSpecDetail] = useState("");

    const [Specs, setSpecs] = useState([]);

    const [newSpec, setNewSpec] = useState({
        id: 0,
        spec: "",
        detail: ""
    });

    const addNewSpec = () => {

        const tempSpec = {
            id: newSpec.id + 1,
            spec: "",
            detail: ""
        }

        setNewSpec(tempSpec)
        setSpecs(Specs => [...Specs, newSpec])
    }

  return (
    <div>
        {Specs.map((spec, index) => {
            return (
                <div>
                    <Spec Specs={Specs} setSpecs={setSpecs} addNewSpec={addNewSpec} idx={index} key={index}/>
                </div>
                
            )
        })}
        <button onClick={addNewSpec}>Add Field</button>
    </div>
  )
}

export default SpecsPage