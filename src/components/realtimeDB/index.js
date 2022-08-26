import StartFirebase from "../firebaseconfig/index";
import React from "react";
import { ref,onValue } from "firebase/database";
import { Table } from "react-bootstrap";

const db = StartFirebase();

export class RealtimeData extends React.Component{
    constructor(){
         super(); //used when we need to access some variable of the parent class. Parent class here is React.Component
         this.state = {  // this.state represents the rendered values, i.e. what’s currently on the screen.
            tableData: []
         }
    }

    componentDidMount(){
        const dbRef = ref(db,'Location');

        onValue(dbRef ,(snapshot)=>{
            let records=[];
            snapshot.forEach(childsnapshot=>{
                let keyName=childsnapshot.key;
                let data =  childsnapshot.val();
                records.push({"key":keyName,"data":data});
            });
            this.setState({tableData: records});
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