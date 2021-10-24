import {
  IonModal,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonChip,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import MyMarker from "./MyMarker";

import { useState, useRef, useEffect } from "react";
import ExploreContainer from "../components/ExploreContainer";
import { add, alert, link } from "ionicons/icons";
import "./Home.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaHJpa2JoIiwiYSI6ImNrdjU1M3UwOTF3a2syb3ExaDZvZG04dWoifQ.DyORA0PJeOL1oQhxA3jMMw";

const Home: React.FC = () => {
  let exposureContainer: any;

  const url = "http://localhost:8000/api/";

  const points = [
    {
      id: 1,
      title: "Mary Gates Hall",
      lat: 47.65489345919378,
      lng: -122.30782943077774,
    },
    {
      id: 2,
      title: "Paul Allen Center for CS",
      lat: 47.65340354952161,
      lng: -122.30590811728844,
    },
    {
      id: 3,
      title: "Bagley Hall",
      lat: 47.652963773474845,
      lng: -122.30863304284266,
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [exposureModal, setExposureModal] = useState(false);
  const [addClassModal, setAddClassModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [classes, setClasses] = useState<any[]>([]);

  const [addBldg, setAddBldg] = useState("");
  const [addRmNum, setAddRmNum] = useState("");

  const [cbldg, setCbldg] = useState("");
  const [crm, setCrm] = useState("");
  const [cnum_cases, setCnum_cases] = useState("");
  const [clocs, setClocs] = useState("[]");

  const [showMapModal, setShowMapModal] = useState(false);

  const [exposureBldg, setExposureBldg] = useState("");
  const [exposureRmNum, setExposureRmNum] = useState("");
  const [exposureRoomPart, setExposureRoomPart] = useState("5");
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  let [map, setMap] = useState(null);

  useEffect(() => {
    if (showMapModal) {
      const attachMap = (setMap: React.Dispatch<React.SetStateAction<any>>) => {
        console.log(mapContainer.current);
        const map = new mapboxgl.Map({
          container: mapContainer.current || "", // NO ERROR
          style: "mapbox://styles/hrikbh/ckv55b2c34syd14pi4pwf2g7k",
          center: [lng, lat],
          zoom: zoom,
        });
        setMap(map);
      };

      !map && attachMap(setMap);
    }
  }, [showMapModal]);

  async function getBldgs(name: string, rm: string) {
    try {
      if (name == "") {
        let default_val: any = [
          <IonItem>
            <IonLabel>Try searching for a building at UW!</IonLabel>
          </IonItem>,
        ];
        setSearchResults(default_val);
      } else {
        let response: any = await axios.get(
          `${url}buildings/get-buildings/${name}`
        );
        let data = response.data;
        let lists: any = [];
        if (data.length == 0) {
          lists.push(
            <IonItem>
              <IonLabel>Uh oh.. We found no building by that name</IonLabel>
            </IonItem>
          );
        } else {
          for (let i of data) {
            lists.push(
              <IonItem onClick={() => showModalWithData(i.name, rm)}>
                <IonLabel>{i.name}</IonLabel>
              </IonItem>
            );
          }
        }
        setSearchResults(lists);
      }
    } catch (err: any) {
      console.log(err.response);
    }
  }

  function handleSearching(x: any) {
    setSearchText(x);
    getBldgs(x, roomNum);
  }

  async function addReport() {
    let r1: any = await axios.get(
      `${url}buildings/get-buildings/${exposureBldg}`
    );
    let name = r1.data[0].name;
    console.log(name);
    try {
      let t_dat = {
        buildingName: name,
        roomName: exposureBldg + exposureRmNum,
        sectionToReport: exposureRoomPart,
      };

      let response: any = await axios.post(
        `${url}rooms/report-positive/`,
        t_dat
      );

      console.log(response);
    } catch (err: any) {
      console.log(err.response);
    }
  }

  function handleAddReport() {
    addReport();
    setExposureModal(false);
  }

  function handleRoomNum(x: any) {
    setRoomNum(x);
    getBldgs(searchText, x);
  }

  function handleAddClass() {
    setClasses([...classes, { bldg: addBldg, rm: addRmNum }]);
    setAddBldg("");
    setAddRmNum("");
    setAddClassModal(false);
  }

  async function editExposureContainer(tbldg: string, trm: string) {
    // get other data
    try {
      let r0: any = await axios.get(`${url}buildings/get-buildings/${tbldg}`);
      let code = r0.data[0].code;
      let r1: any = await axios.get(`${url}rooms/get-room/${code + trm}`);
      console.log("r1 dat:");
      console.log(r1);
      console.log(r1.data.length);
      if (r1.data.length != 0) {
        setCbldg(tbldg);
        setCrm(trm);
        setCnum_cases(r1.data.totalReports);
        setClocs(JSON.stringify(r1.data.quantSubdivision));
      } else {
        setCbldg(tbldg);
        setCrm(trm);
        setCnum_cases("0");
        setClocs("[0,0,0,0,0,0,0,0,0]");
      }
    } catch (e: any) {
      console.log(e.response);
    }
  }

  function showModalWithData(bldg: any, rm: any) {
    editExposureContainer(bldg, rm);
    setShowModal(true);
  }

  function getClasses() {
    if (classes.length == 0) {
      return ["Uh oh.. you don't have any classes yet.. add some!"];
    } else {
      let finalVals = [];
      for (let item of classes) {
        finalVals.push(
          <IonChip onClick={() => showModalWithData(item.bldg, item.rm)}>
            <IonIcon color="warning" icon={alert} />
            <IonLabel>
              {item.bldg.toUpperCase()} - {item.rm}
            </IonLabel>
            <IonIcon color="primary" icon={link} />
          </IonChip>
        );
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
        <IonButton
          expand="block"
          size="small"
          onClick={() => setSearchModal(true)}
          fill="outline"
        >
          Search for rooms by building
        </IonButton>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Your classes </IonCardTitle>
            <IonButton
              size="small"
              color="success"
              onClick={() => setAddClassModal(true)}
            >
              Add a new class
            </IonButton>
            {/*<IonButton size="small" onClick={() => setShowModal(true)}>Test Button To Open Class Modal</IonButton>*/}
          </IonCardHeader>
          <IonCardContent>{getClasses()}</IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Heatmap </IonCardTitle>
            <IonButton
              size="small"
              color="primary"
              onClick={() => setShowMapModal(true)}
            >
              Show map of area
            </IonButton>
            {/*<IonButton size="small" onClick={() => setShowModal(true)}>Test Button To Open Class Modal</IonButton>*/}
          </IonCardHeader>
          <IonCardContent>
            <p>See a map containing the number of COVID-19 cases on a map</p>
          </IonCardContent>
        </IonCard>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol size="12"></IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonButton
                  size="default"
                  expand="block"
                  color="danger"
                  onClick={() => setExposureModal(true)}
                >
                  Report Exposure
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonFooter>

      <IonModal isOpen={showModal}>
        {
          <ExploreContainer
            bldg={cbldg}
            rm={crm}
            num_cases={cnum_cases}
            locs={clocs}
          />
        }
        <IonButton onClick={() => setShowModal(false)}>Back</IonButton>
      </IonModal>

      <IonModal isOpen={searchModal}>
        <IonSearchbar
          value={searchText}
          placeholder="Search for a building here..."
          onIonChange={(e) => handleSearching(e.detail.value!)}
        ></IonSearchbar>
        <IonSearchbar
          value={roomNum}
          placeholder="Enter room number here..."
          onIonChange={(e) => handleRoomNum(e.detail.value!)}
        ></IonSearchbar>
        <IonContent>
          <IonList>{searchResults}</IonList>
        </IonContent>
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
            <IonLabel position="stacked">
              Building Code (Not full name)
            </IonLabel>
            <IonInput
              value={addBldg}
              onIonChange={(e) => setAddBldg(e.detail.value!)}
            >
              {" "}
            </IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Room #</IonLabel>
            <IonInput
              value={addRmNum}
              onIonChange={(e) => setAddRmNum(e.detail.value!)}
            >
              {" "}
            </IonInput>
          </IonItem>
        </IonContent>
        <IonFooter>
          <IonButton
            expand="block"
            onClick={() => handleAddClass()}
            color="success"
            disabled={addBldg == "" || addRmNum == "" ? true : false}
          >
            Add
          </IonButton>
          <br />
          <IonButton
            expand="block"
            onClick={() => setAddClassModal(false)}
            color="danger"
          >
            Cancel
          </IonButton>
        </IonFooter>
      </IonModal>

      <IonModal isOpen={showMapModal}>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className="map-container" />
        {/*<GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBqEpiQkFa5ZBlRRLJCXeIlii9vddl2pmY",
            libraries: ['visualization'],
            language: "en",
            region: "US"
          }}
          defaultCenter={{ lat: 47.65471269808691, lng: -122.30845939266062 }}
          defaultZoom={16}
        >
          {points.map(({ lat, lng, id, title }) => {
            return (
              MyMarker
            );
          })}
        </GoogleMapReact>*/}
        <IonFooter>
          <IonButton
            expand="block"
            onClick={() => setShowMapModal(false)}
            color="danger"
          >
            Back
          </IonButton>
        </IonFooter>
      </IonModal>

      <IonModal isOpen={exposureModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle size="small">
              Where did you go in the last days? (Note: you will have to fill
              this out for each room)
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonLabel position="stacked">Building Code</IonLabel>
            <IonInput
              value={exposureBldg}
              onIonChange={(e) => setExposureBldg(e.detail.value!)}
            >
              {" "}
            </IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Room #</IonLabel>
            <IonInput
              value={exposureRmNum}
              onIonChange={(e) => setExposureRmNum(e.detail.value!)}
            >
              {" "}
            </IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Which part of the room?</IonLabel>
            <IonSelect
              value={exposureRoomPart}
              placeholder="Select One"
              onIonChange={(e) => setExposureRoomPart(e.detail.value)}
            >
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
          <IonButton
            expand="block"
            onClick={() => handleAddReport()}
            color="success"
          >
            Confirm
          </IonButton>
          <br />
          <IonButton
            expand="block"
            onClick={() => setExposureModal(false)}
            color="danger"
          >
            Cancel
          </IonButton>
        </IonFooter>
      </IonModal>
    </IonPage>
  );
};

export default Home;
