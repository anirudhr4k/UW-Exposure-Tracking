import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from "@ionic/react";

interface ContainerProps { }

const ExploreContainer: React.FC<{ bldg: string, rm: string, num_cases: any, locs: any }> = ({ bldg, rm, num_cases, locs }) => {
  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{num_cases} reported cases</IonTitle>
          <br />
          <br />
          <br />
          <IonTitle size="small">{bldg.toUpperCase()} - {rm}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <br />
        <IonGrid>
          <IonRow>
            <p>Positive Case Locations:</p>
          </IonRow>
          <IonRow>
            <p className="tcenter">Front of Room</p>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonButton color="light" size="large" expand="block"></IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton color="warning" size="large" expand="block">Room Front</IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton color="light" size="large" expand="block"></IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonButton color="warning" size="large" expand="block">Left</IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton color="danger" size="large" expand="block"></IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton color="warning" size="large" expand="block">Right</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonButton color="light" size="large" expand="block"></IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton color="warning" size="large" expand="block">Room Back</IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton color="light" size="large" expand="block"></IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <p className="tcenter">Back of Room</p>
          </IonRow>
        </IonGrid>
        <IonRow>
          <p className="tcenter">{num_cases} Reported Cases</p>
        </IonRow>
      </IonContent>
    </IonContent >
  );
};

export default ExploreContainer;
