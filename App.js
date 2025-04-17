import { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


const App = () => {

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState('');
  const cameraRef = useRef(null)

  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, []);

  const handleCapture = async () => {
    const photo = await cameraRef.current.takePhoto();
    setImage(photo?.path);
    setShowCamera(false);
  }

  const renderCaptureImage = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {image && <Image
          source={{ uri: `file://${image}` }}
          style={{ width: wp('80%'), height: hp('40%'), marginBottom: hp('5%') }}
        />}
        <TouchableOpacity
          style={{ padding: 15, borderRadius: 15, alignItems: 'center', backgroundColor: 'black' }}
          onPress={() => setShowCamera(true)}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Capture Image</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderCamera = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {device == null ?
          <Text>Loading...</Text> :
          <View style={{ flex: 1 }}>
            <Camera
              ref={cameraRef}
              style={{ width: wp('100%'), height: hp('100%') }}
              device={device}
              isActive={true}
              photo={true}
            />
            <TouchableOpacity style={{
              width: 60,
              height: 60,
              borderRadius: 60,
              backgroundColor: 'white',
              position: 'absolute',
              bottom: 50,
              left: wp('43%'),
            }}
              onPress={() => {
                handleCapture()
              }}
            >

            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {showCamera ? renderCamera() : renderCaptureImage()}
    </View>
  )
}

export default App;