import { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { loadTensorflowModel, useTensorflowModel } from "react-native-fast-tflite";

const TensorFlowJs = () => {

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const cameraRef = useRef(null)


  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, []);

  const handleCapture = async () => {
    try {
      const photo = await cameraRef.current.takePhoto();
      console.log('photo', photo);
      setImage(photo?.path)
      setShowCamera(false);
    } catch (error) {
      console.log('error', error);
    }

  }

  const renderCaptureImage = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {image && <Image
          source={{ uri: `file://${image}` }}
          style={{ width: wp('80%'), height: hp('40%'), }}
        />}
        {text && <Text style={{ fontSize: 20, color: 'black', marginVertical: 20 }}>{text}</Text>}
        <TouchableOpacity
          style={{ padding: 15, borderRadius: 15, alignItems: 'center', backgroundColor: 'black', marginVertical: 10 }}
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
      <Text style={{ margin: 20, fontSize: 24 }}>Tensor Flow Modal</Text>
      {showCamera ? renderCamera() : renderCaptureImage()}
    </View>
  )
}

export default TensorFlowJs;