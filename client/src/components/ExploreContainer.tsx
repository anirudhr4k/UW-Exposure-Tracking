import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from "@ionic/react";

interface ContainerProps { }

const ExploreContainer: React.FC<{ bldg: string, rm: string, num_cases: any, locs: any }> = ({ bldg, rm, num_cases, locs }) => {
  let p_locs = JSON.parse(locs)

  function find_color(amt: number) {
    if (amt > 1) {
      return "danger"
    } else if (amt >= 1) {
      return "warning"
    } else {
      return "light"
    }
  }

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{num_cases} reported case{num_cases != 1 ? "s" : ""}</IonTitle>
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
              <IonButton color={find_color(p_locs[0])} size="large" expand="block"></IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton color={find_color(p_locs[1])} size="large" expand="block">Room Front</IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton color={find_color(p_locs[2])} size="large" expand="block"></IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonButton color={find_color(p_locs[3])} size="large" expand="block">Left</IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton color={find_color(p_locs[4])} size="large" expand="block"></IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton color={find_color(p_locs[5])} size="large" expand="block">Right</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonButton color={find_color(p_locs[6])} size="large" expand="block"></IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton color={find_color(p_locs[7])} size="large" expand="block">Room Back</IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton color={find_color(p_locs[8])} size="large" expand="block"></IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <p className="tcenter">Back of Room</p>
          </IonRow>
        </IonGrid>
        <IonRow>
          <p className="tcenter">{num_cases} Reported Case{num_cases != 1 ? "s" : ""}</p>
        </IonRow>
      </IonContent>
    </IonContent >
  );
};

export default ExploreContainer;
