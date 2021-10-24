import { IonModal, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel, IonChip } from '@ionic/react';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {

  let exposureContainer = (<ExploreContainer bldg="mgh" rm="220" num_cases="12" locs="[0, 1, 1, 0, 0, 1, 0, 0, 0]" />)

  const [showModal, setShowModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [exposureModal, setExposureModal] = useState(false);
  const [addClassModal, setAddClassModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  function handleSearching(x: any) {
    setSearchText(x)
  }

  function editExposureContainer(tbldg: string, trm: string) {
    // get other data 
    exposureContainer = (<ExploreContainer bldg={"" + tbldg} rm={"" + trm} num_cases="0" locs="" />)
  }


  function showModalWithData(bldg: any, rm: any) {
    setShowModal(true)
  }

  function getClasses() {
    let classes: any[] = [{ bldg: "mgh", rm: "220" }, { bldg: "sea", rm: "Terminal 2" }]

    if (classes.length == 0) {
      return ["Uh oh.. you don't have any classes yet.. add some!"]
    } else {
      let finalVals = []
      for (let item of classes) {
        finalVals.push((<IonChip onClick={() => showModalWithData(item.bldg, item.rm)}>
          <IonLabel>{item.bldg.toUpperCase()} - {item.rm}</IonLabel>
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
            <IonButton size="small" color="success">Add a new class</IonButton>
            <IonButton size="small" onClick={() => setShowModal(true)}>Test Button To Open Class Modal</IonButton>
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
                <IonButton size="default" expand="block" color="danger" >
                  Report Exposure
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonFooter>



      <IonModal isOpen={showModal} cssClass='my-custom-class'>
        {exposureContainer}
        <IonButton onClick={() => setShowModal(false)}>Back</IonButton>
      </IonModal>



      <IonModal isOpen={searchModal} cssClass='my-custom-class'>
        <IonSearchbar value={searchText} placeholder="Search for a building here..." onIonChange={e => handleSearching(e.detail.value!)}></IonSearchbar>
        <IonButton onClick={() => setSearchModal(false)}>Back</IonButton>
      </IonModal>


      <IonModal isOpen={searchModal} cssClass='my-custom-class'>
        <IonSearchbar value={searchText} placeholder="Search for a building here..." onIonChange={e => handleSearching(e.detail.value!)}></IonSearchbar>
        <IonButton onClick={() => setSearchModal(false)}>Back</IonButton>
      </IonModal>
    </IonPage>
  );
};

export default Home;
