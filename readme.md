# Vision on the Edge

## Introduction

Visual inspection of products, resources and environments has been a core practice for most Enterprises, and was, until recently, a very manual process. An individual, or group of individuals, was responsible for performing a manual inspection of the asset or environment, which, depending on the circumstances, could become inefficient, inaccurate or both, due to human error and limitations.

Our intent with this [guidance](/docs/guidance.md) is to provide a detailed view at the technologies availble today to allow enterprices to fully capitalize on the power of AI, Edge Computing and advancements in camera technologies to bring bring powerful vision at the edge solutions. In addition, we are provinding a simple [sample solution](/docs/vision-sample.md) that brings some of the ideas in the guidance document to life. 

## Guidance

The purpose of this document is to give some concrete guidance on some of the key decisions when designing an end-to-end vision on the edge solution. Specifically, we will address:

* [Camera selection and placement](@/docs/guidance.md#camera-considerations)
* [Hardware acceleration](@/docs/guidance.md#hardware-acceleration)
* [Choice of ML model](@/docs/guidance.md#machine-learning-model)
* [Image storage and management](@/docs/guidance.md#image-storage-and-management)
* [Persistence of alerts](@/docs/guidance.md#inferencing-results-persistence)
* [User Interface](@/docs/guidance.md#user-interface)

## Sample Solution

Our approach to the sample solution was to take advantage of as much out of the box functionality as possible to show that complex problems can be solved with technologies that don't require expert-level skill sets to or long project time cycles to implement. The following technologies and services were used to implement the sample solutions:

* [Azure AppService](https://docs.microsoft.com/en-us/azure/app-service/)
* [Azure WebApps](https://docs.microsoft.com/en-us/azure/app-service/)
* [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/)
* [Azure SignalR](https://docs.microsoft.com/en-us/azure/azure-signalr/)
* [CosmoDB](https://docs.microsoft.com/en-us/azure/cosmos-db/)
* [IoT Hub](https://docs.microsoft.com/en-us/azure/iot-hub/)
* [IoT Edge](https://docs.microsoft.com/en-us/azure/iot-edge/)
* [Azure Cognitive Services](https://docs.microsoft.com/en-us/azure/machine-learning/)
* [Azure Security Center for IoT](https://docs.microsoft.com/en-us/azure/asc-for-iot/)
* [ReactJS]()
  
### Solution Archtecture

ADD VISIO DIAGRAM HERE