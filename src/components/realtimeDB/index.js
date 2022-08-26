import StartFirebase from "../firebaseconfig/index";
import React from "react";
import { ref,onValue } from "firebase/database";
import { Table } from "react-bootstrap";

const db = StartFirebase();

export class realtimeData extends React.Component{
    constructor(){
         super();
         this.state = {
            tableData: []
         }
    }

    componentDidMount(){
        const dbRef = ref(db,'Customer');

        onValue(dbRef ,(snapshot)=>{

        });
    }


    render(){
        return(
        <Table>
            <thead>
                <tr>
                    <th>Received Location</th>
                    <th>Received Photo</th>
                </tr>
            </thead>
            <tbody>
                {this.state.tableData.map((row,index)=>{
                    return(
                        <tr>
                        <td>{index}</td>
                        <td>{row.key}</td>
                        <td>{row.data.latitude}</td>
                        <td>{row.data.longitude}</td>
                    </tr>
                    )
                })}
            </tbody>
        </Table>
        )   
    }
}