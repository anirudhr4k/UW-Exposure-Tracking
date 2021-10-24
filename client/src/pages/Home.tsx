import { IonModal, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel, IonChip, IonInput, IonSelect, IonSelectOption } from '@ionic/react';
import axios from 'axios'
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import { alert, link } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {

  let exposureContainer: any;

  const [showModal, setShowModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [exposureModal, setExposureModal] = useState(false);
  const [addClassModal, setAddClassModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [cbldg, setCbldg] = useState("");
  const [crm, setCrm] = useState("");
  const [cnum_cases, setCnum_cases] = useState("");
  const [clocs, setClocs] = useState("[]");

  const [exposureRoomPart, setExposureRoomPart] = useState("5")


  async function getBldgs(name: string) {
    try {
      let response = await axios.get(`http://172.22.1.3:8000/api/buildings/get-buildings/${name}`)
      console.log(response)
    } catch (err: any) {
      console.log(err.response)
    }
  }

  function handleSearching(x: any) {
    getBldgs(x)
    setSearchText(x)
  }

  function editExposureContainer(tbldg: string, trm: string) {
    // get other data
    setCbldg(tbldg);
    setCrm(trm);
    setCnum_cases("" + Math.floor(Math.random() * 10));
    setClocs("[0,1,1,200,6,1,2,3,100]")
  }


  function showModalWithData(bldg: any, rm: any) {
    editExposureContainer(bldg, rm)
    setShowModal(true)
  }

  function getClasses() {
    let classes: any[] = [{ bldg: "gug", rm: "220" }, { bldg: "ece", rm: "045" }]

    if (classes.length == 0) {
      return ["Uh oh.. you don't have any classes yet.. add some!"]
    } else {
      let finalVals = []
      for (let item of classes) {
        finalVals.push((<IonChip onClick={() => showModalWithData(item.bldg, item.rm)}>
          <IonIcon color="warning" icon={alert} />
          <IonLabel>
            {item.bldg.toUpperCase()} - {item.rm}
          </IonLabel>
          <IonIcon color="primary" icon={link} />
        </IonChip>))
      }
      return finalVals;
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>UW Exposure Tracking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">UW Exposure</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton expand="block" size="small" onClick={() => setSearchModal(true)} fill="outline">Search for buildings...</IonButton>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Your classes </IonCardTitle>
            <IonButton size="small" color="success" onClick={() => setAddClassModal(true)}>Add a new class</IonButton>
            {/*<IonButton size="small" onClick={() => setShowModal(true)}>Test Button To Open Class Modal</IonButton>*/}
          </IonCardHeader>
          <IonCardContent>
            {getClasses()}
          </IonCardContent>
        </IonCard>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonButton size="default" expand="block" color="danger" onClick={() => setExposureModal(true)}>
                  Report Exposure
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonFooter>



      <IonModal isOpen={showModal}>
        {<ExploreContainer bldg={cbldg} rm={crm} num_cases={cnum_cases} locs={clocs} />}
        <IonButton onClick={() => setShowModal(false)}>Back</IonButton>
      </IonModal>



      <IonModal isOpen={searchModal}>
        <IonSearchbar value={searchText} placeholder="Search for a building here..." onIonChange={e => handleSearching(e.detail.value!)}></IonSearchbar>
        <IonButton onClick={() => setSearchModal(false)}>Back</IonButton>
      </IonModal>

      <IonModal isOpen={addClassModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Add new class</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonLabel position="stacked">Building</IonLabel>
            <IonInput> </IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Room #</IonLabel>
            <IonInput> </IonInput>
          </IonItem>
        </IonContent>
        <IonFooter>
          <IonButton expand="block" onClick={() => setAddClassModal(false)} color="success">Add</IonButton>
          <br />
          <IonButton expand="block" onClick={() => setAddClassModal(false)} color="danger">Cancel</IonButton>
        </IonFooter>
      </IonModal>

      <IonModal isOpen={exposureModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Where did you go in the last days? (Note: you will have to fill this out for each room)</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonLabel position="stacked">Building Code</IonLabel>
            <IonInput> </IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Room #</IonLabel>
            <IonInput> </IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Which part of the room?</IonLabel>
            <IonSelect value={exposureRoomPart} placeholder="Select One" onIonChange={e => setExposureRoomPart(e.detail.value)}>
              <IonSelectOption value="1">Front Left</IonSelectOption>
              <IonSelectOption value="2">Front Middle</IonSelectOption>
              <IonSelectOption value="3">Front Right</IonSelectOption>
              <IonSelectOption value="4">Middle Left</IonSelectOption>
              <IonSelectOption value="5">Middle</IonSelectOption>
              <IonSelectOption value="6">Middle Right</IonSelectOption>
              <IonSelectOption value="7">Back Left</IonSelectOption>
              <IonSelectOption value="8">Back Middle</IonSelectOption>
              <IonSelectOption value="9">Back Right</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonContent>
        <IonFooter>
          <IonButton expand="block" onClick={() => setExposureModal(false)} color="success">Confirm</IonButton>
          <br />
          <IonButton expand="block" onClick={() => setExposureModal(false)} color="danger">Cancel</IonButton>
        </IonFooter>
      </IonModal>
    </IonPage>
  );
};

export default Home;
