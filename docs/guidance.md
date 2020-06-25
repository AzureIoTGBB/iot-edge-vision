# Vision on the Edge
<!-- markdownlint-disable MD024 -->

## Introduction

Visual inspection of products, resources and environments has been a core practice for most Enterprises, and was, until recently, a very manual process. An individual, or group of individuals, was responsible for performing a manual inspection of the asset or environment, which, depending on the circumstances, could become inefficient, inaccurate or both, due to human error and limitations.

In an effort to improve the efficacy of visual inspection, Enterprises began turning to deep learning artificial neural networks known as convolutional neural networks, or CNNs, to emulate human vision for analysis of images and video.  Today this is commonly called computer vision, or simply Vision AI. Artificial Intelligence for image analytics spans a wide variety of industries, including manufacturing, retail, healthcare and the public sector, and an equally wide area of use cases.

**Vision as Quality Assurance** – In manufacturing environments, quality inspection of parts and processes with a high degree of accuracy and velocity is one of the use cases for Vision AI. An enterprise pursuing this path automates the inspection of a product for defects to answer questions such as:

* Is the manufacturing process producing consistent results?
* Is the product assembled properly?
* Can I get notification of a defect sooner to reduce waste?
* How can I leverage drift in my computer vision model to prescribe predictive maintenance?

**Vision as Safety** – In any environment, safety is a fundamental concern for every Enterprise on the planet, and the reduction of risk is a driving force for adopting Vision AI. Automated monitoring of video feeds to scan for potential safety issues affords critical time to respond to incidents, and opportunities to reduce exposure to risk.  Enterprises looking at Vision AI for this use case are commonly trying to answer questions such as:

* How compliant is my workforce with using personal protective equipment?
* How often are people entering unauthorized work zones?
* Are products being stored in a safe manner?
* Are there non-reported close calls in a facility, i.e. pedestrian/equipment “near misses?”

## Why vision on the Edge

Over the past decade, computer vision has become a rapidly evolving area of focus for Enterprises, as cloud-native technologies, such as containerization, have enabled portability and migration of this the technology toward the network edge. For instance, custom vision inference models trained in the Cloud can be easily containerized for use in an Azure IoT Edge runtime-enabled device.

The rationale behind migrating workloads from the cloud to the edge for Vision AI generally falls into two categories – performance and cost.

On the performance side of the equation, exfiltrating large quantities of data can cause an unintended performance strain on existing network infrastructure. Additionally, the latency of sending images and/or video streams to the Cloud to retrieve results may not meet the needs of the use case. For instance, a person straying into an unauthorized area may require immediate intervention, and that scenario can ill afford latency when every second counts. Positioning the inferencing model near the point of ingest allows for near-real time scoring of the image, and alerting can be performed either locally or through the cloud, depending on network topology.

In terms of cost, sending all of the data to the Cloud for analysis could significantly impact the ROI of a Vision AI initiative.  With Azure IoT Edge, a Vision AI module could be designed to only capture the relevant images that have a reasonable confidence level based on the scoring, which significantly limits the amount of data being sent.

The purpose of this document is to give some concrete guidance on some of the key decisions when designing an end-to-end vision on the edge solution.  Specifically, we will address:

* [Camera selection and placement](#camera-considerations)
* [Hardware acceleration](#hardware-acceleration)
* [Choice of ML model](#machine-learning-model)
* [Image storage and management](#image-storage-and-management)
* [Persistence of alerts](#inferencing-results-persistence)
* [User Interface](#user-interface)

## Camera Considerations

### Camera selection

One of the most critical components to any vision workload is selecting the correct camera.  The items that are being identified in a vision workload must be presented in such a way so that a computer’s artificial intelligence or machine learning models can evaluate them correctly.  To further understand this concept, you need to understand the different camera types that can be used.  One thing to note in this article as we move forward, there are a lot of different manufactures of Area, Line, Smart Cameras.   Microsoft does not recommend anyone vendor over another, instead we recommend that you select a vendor that fits your specific needs.

#### Area Scan Cameras

This is more of your traditional camera image.   A 2D image is captured and then sent over to the Edge hardware to be evaluated.  This camera typically has a matrix of pixel sensors.

**When should you use an Area Scan Camera?**  As the name suggest, Area Scan Cameras look at a large area and are great at detecting change in an area. Some examples of workloads that would use an Area Scan Camera would be workplace safety, or detecting or counting objects (people,animals,cars,etc.) in an environment.

Examples of manufacturers of Area Scan Cameras are [Basler](https://www.baslerweb.com/en/products/industrial-cameras/), [Axis](https://www.axis.com/en-us), [Sony](https://www.sony.co.jp/Products/ISP/products/), [Bosch](https://commerce.boschsecurity.com/us/en/IP-Cameras/c/10164917899), [FLIR](https://www.flir.com/), [Allied Vision](https://www.alliedvision.com/en/digital-industrial-camera-solutions.html)

#### Line Scan Cameras

Unlike the Area Scan Cameras, the Line Scan Camera has a single row of linear pixel sensors.  This can allow the camera to take one-pixel width in very quick successions and then stitches these one-pixel images into a video stream that is sent over to an Edge Device for processing

**When should you use a Line Scan Camera?** Line Scan Cameras are great for vision workloads where in the items to be identified are moving past the camera, or items that need to be rotated to detect defects.  The Line Scan Camera would then be able to produce a continuous image stream that can then be evaluated.  Some examples of workloads that would work best with a Line Scan Camera would be item defect detection on parts that are moved on a conveyer belt; workload that require spinning to see a cylindrical object; any workload that requires rotation.

Examples of manufacturers of Area Scan Cameras are [Basler](https://www.baslerweb.com/en/products/industrial-cameras/), [Teledyne Dalsa](https://www.teledynedalsa.com/en/home/), [Hamamatsu Corporation](https://www.hamamatsu.com/us/en/index.html?nfxsid=5ede4ac8e12e41591626440), [DataLogic](https://www.datalogic.com/), [Vieworks](https://vieworks.com/), and [Xenics](https://www.xenics.com/)

#### Embedded Smart Camera

This type of camera can use either a Area Scan or Line Scan Camera for the acquisition of the images, however, the Line Scan Smart Camera is rare.  The main feature of this camera is that it not only acquires the image, but it can also process the image as they are a self-contained stand-alone system.  They typically have either and RS232 or Ethernet port output, and this allows the Smart Cameras to be integrated directly into a PLC or other IIoT interfaces.

Examples of manufacturers of Embedded Smart Cameras are  [Basler](https://www.baslerweb.com/en/products/industrial-cameras/), [Lesuze Electronics](https://www.leuze.com/en/usa/)

#### Other camera features to consider

* **Sensor size:**  This is one of the most important factors to evaluate in any vision workload.  A sensor is the hardware within a camera that is capturing the light and converting into signals which then produces an image.  The sensor contains millions of semiconducting photodetectors that are called photosites.  One thing that is a bit of a miss conception is that higher megapixel count is a better image.  For example, let’s look at two different sensor sizes for a 12-megapixel camera.  Camera A has a ½ inch sensor with 12 million photosites and camera B has a 1-inch sensor with 12 million photosites.  In the same lighting conditions the camera that has a 1-inch sensor will be cleaner and sharper.  In cameras that would be used in vision workloads would have a sensor between ¼ inch to 1 inch.  In some cases, much larger sensors might be required.  **_If a camera has a choice between a larger sensor or a smaller sensor some factors consider as to why you might choose the larger sensor are:_**
  * need for precision measurements
  * Lower light conditions
  * Shorter exposure times, i.e. fast-moving items
* **Resolution:** This is another one of the most important factors to both Line Scan and Area Scan camera workloads.  If your workload must identify fine features (Ex. writing on an IC Chip) then you need greater resolutions of the cameras used.  If your workload is trying to detect a face, then higher resolutions is required.  And if you need to identify a vehicle from a distance, again this would require higher resolution.
* **Speed:** Sensors come in two types a CCD and a CMOS.  If the vision workload requires high number of images per second capture rate, then there are two factors that come into play.  The first is how fast is the connection on the interface of the camera and the second is what type of sensor is it.  CMOS sensors have a direct readout from the photosites and because of this they typically offer a higher frame rate.

> NOTE:  There are more camera features to consider when selecting the correct camera for your vision workload.  These include lens selection, focal length, monochrome, color depth, stereo depth, triggers, physical size, and support. Sensor manufacturers can help you understand the specific feature that your application may require.

### Camera Placement (location, angle, lighting, etc.)

Depending on the items that you are capturing in your vision workload will determine the location and angles that the camera should be placed.  The camera location can also affect the sensor type, lens type, and camera body type.  There are several key concepts to keep in mind when figuring out the perfect spot to place the camera in.

There are several different factors that can weigh into the overall decision for camera placement.  Two of the most critical are lighting and field of view

#### Camera Lighting

In a computer vision workload lighting is a critical component to camera placement.  There are several different lighting conditions.  While some of the lighting conditions would be useful for one vision workload, it might produce an undesirable condition in another.  Types of lighting that are commonly used in computer vision workloads are:

* **Direct lighting:** this is the most common used lighting condition.  This light source is projected at the object to be captured for evaluation.

* **Line lighting:** This is a single array of lights that are most used with line scan camera applications to create a single line of light where the camera is focused.

* **Diffused lighting:** This type of lighting is used to illuminate an object but prevent harsh shadows and is mostly used around specular objects.

* **Back lighting:** This type of light source is used behind the object, in which produces a silhouette of the object.  This is most useful when taking measurements, edge detection, or object orientation.

* **Axial diffused lighting:** This type of light source is often used with highly reflective objects, or to prevent shadows on the part that will be captured for evaluation.

* **Custom Grid lighting:** This is a structured lighting condition that lays out a grid of light on the object, the intent is to have a known grid projection to then provide more accurate measurements of components, parts, placement of items, etc.

* **Strobe lighting:** Strobe lighting is used for high speed moving parts.  The strobe must be in sync with the camera to take a “freeze” of the object for evaluation, this lighting helps to prevent motion blurring effect.

* **Dark Field lighting:** This type of light source uses several lights in conjunction with different angles to the part.  For example, if the part is laying flat on a conveyor belt the lights would be placed at a 45-degree angle to the part.  This type of lighting is most useful when looking at highly reflective clear objects…and is most commonly used with lens scratch detections.

  Angular placement of light

![lightingchart](../media/Lightingchart.png)

#### Field of View

In a vision workload you need to know the distance to the object that you are trying to evaluate.  This also will play a part in the camera selection, sensor selection, and lens configuration.  Some of the components that make up the field of view are:

* **Distance to object(s):** For an example is the object that we are monitoring with computer vision on a conveyor belt and the camera is 2 feet above it or is the object across a parking lot.  As the distance changes so does the camera’s sensors and lens configurations.
* **Area of coverage:** is the area that the computer vision trying to monitor small or large.  This has direct correlation to the camera’s resolution overall, lens, and sensor type.
* **Direction of the Sun:** if the computer vision workload is outside, like monitoring a job construction site for worker safety will the camera be pointed in the sun at any time.  Keep in mind that if the sun is casting a shadow over the object that the vision workload is monitoring, items might be obscured a bit.  Also, if the camera is getting direct sunlight in the lens, the camera might be “blinded” until the angle of the sun changes.
* **Camera angle to the object(s):** angle of the camera to the object that the vision workload is monitoring is also critical component to think about.  If the camera is to high it might miss the details that the vision workload is trying to monitor for, and same is true if it is too low.

### Communication Interface

In building a computer vision workload it is also important to understand how the system will interact with the output of the camera.  Below are a few of the standard ways that a camera will communicate to IoT Edge:

* **Real Time Streaming Protocol(RTSP):** RTSP is a protocol that transfers real-time video data from a device (in our case the camera) to an endpoint device (Edge compute) directly over a TCP/IP connection.  It functions in a client server application model that is at the application level in the network.

* **Open Network Video Interface Forum (ONVIF):** a global and open industry forum that is developing open standards for IP-based cameras.  This standard is aimed at standardization of communication between the IP Camera and down stream systems, Interoperability, and Open sourced.

* **USB:** Unlike RTSP and ONVIF USB connected cameras connect over the Universal Serial Bus directly on the Edge compute device.  This is less complex; however, it is limited on distance that the camera can be placed away from the Edge compute.

* **Camera Serial Interface:**  CSI specification is from Mobile Industry Processor Interface(MIPI).  It is an interface that describes how to communicate between a camera and a host processor.

There are several standards defined for CSI

* **CSI-1**:  This was the original standard that MIPI started with.  
* **CSI-2**:  This standard was released in 2005, and uses either D-PHY or C-PHY as physical layers options.  This is further divided into several layers:
  1. Physical Layer (C-PHY, D-PHY)
  2. Lane Merger layer
  3. Low Level Protocol Layer
  4. Pixel to Byte Conversion Layer
  5. Application layer

The specification was updated in 2017 to v2 and added support for RAW-24 color depth, Unified Serial Link, and Smart Region of Interest.

## Hardware Acceleration

Along with the camera selection, one of the other critical decisions in Vision on the Edge projects is hardware acceleration. Options include:

* **CPU:** The Central Processing Unit (CPU) is your default compute for most processes running on a computer, it is designed for general purpose compute. Some Vision Workloads where timing is not as critical this might be a good option. However, most workloads that involve critical timing, multiple camera streams, and/or high frame rates will require more specific hardware acceleration
* **GPU:** Many people are familiar with the Graphics Processing Unit (GPU) as this is the de-facto processor for any high-end PC graphics card. In recent years the GPU has been leveraged in high performance computer (HPC) scenarios, and in data mining, and in computer AI/ML workloads. The GPU’s massive potential of parallel computing can be used in a vision workload to accelerate the processing of pixel data. The downside to a GPU is the power to watt ratio and this is a critical factor to consider for your vision workload.
* **FPGA:** Field Programmable Gate Arrays are reconfigurable hardware accelerators. These powerful accelerators allow for the growth of Deep Learning Neural networks, which are still evolving. These accelerators have millions of programmable gates, hundred of I/O pins, and exceptional compute power (in the Trillions of tera-MAC’s) There also a lot of different libraries available for FPGA’s to use that are optimized for vision workloads. Some of these libraries also include preconfigured interfaces to connect to downstream cameras and devices. One area that FPGA’s tend to fall short on is floating point operations, however, manufacturers are currently working on this issue and have made a lot of improvements in this area.
* **ASIC:** Application Specific Integrated Circuit is by far the fastest accelerator on the market today.  While they are the fastest, they are the hardest to change as they are manufactured to function for a specific task.  These custom chips are gaining popularity due to size, power per watt performance, and IP protection (because the IP is burned into the ASIC accelerator it is much harder to backwards engineer proprietary algorithms).

## Machine Learning Models

* **TensorFlow**:  Tensorflow is Google Brains second generations system and was released in 2017.  It is a flexible architecture and allows for easy deployment of computations with CPU, GPU, TPU, etc.  TensorFlow makes use of neural networks on multidimensional data arrays, which is referred to as a tensor.  TensorFlow is very popular in Machine learning / Artificial Intelligence workflows.  

* **OpenVINO**: Open Visual Interface and Neural Network Optimization) is a toolkit from Intel for optimization of Deep Learning models.  There are two different versions of the tool kit, one that is OpenVINO which is supported by open source community and Intel(R) Distribution of OpenVINO which is supported by Intel.  This toolkit supports Caffe, TensorFlow, MxNet, Kaldi, and ONNX.

* **ONNX**:  Open neural Network Exchange is an ecosystem for open-source artificial intelligence.  In 2017 Facebook and Microsoft built a way to switch between machine learning frameworks like PyTorch, Caffe2, IBM, ARM, AMD, and Qualcomm.  This integrational framework allows for developers to easily move between frameworks, allowing for the AI development to take advantage of faster training, network architecture fixability, or use on mobile devices.  Other partnerships with ONNX is Facebook, Microsoft, Apple, Amazon, Google, and IBM.

## Image storage and management

Storage and management of the images involved in a computer vision application is a critical function.  Some of the key considerations for managing those images are:

* Ability to store all raw images during training with ease of retrieval for labeling
* Faster storage medium to avoid pipeline bottleneck and loss
* Storage on the edge as well as in the cloud, as labelling activity can be performed in both
* Categorization of images for easy retrieval
* Naming and tagging images to link it with inferred metadata

The combination of Azure Blob Storage, Azure IoT Hub, and Azure IoT Edge allow several potential options for the storage of image data:

* Use of the [Azure IoT Edge Blob Storage module](https://docs.microsoft.com/en-us/azure/iot-edge/how-to-store-data-blob), which will automatically sync images to Azure Blob based on policy
* Store images to local host file system and upload to Azure blob service using a custom module
* Use of local database to store images, which then can be synced to cloud database

We believe that the IoT Edge Blob Storage module is the most powerful and straightforward solution and is our preferred approach. A typical workflow for this might be:

1. Raw messages post ingestion will be stored locally on the Edge Blob Module, with time stamp and sequence number to uniquely identify the image files
2. Policy can be set on the Edge Blob Module for automatic upload to Azure Blob with ordering
3. To conserve space on the Edge device, auto delete after certain time can be configured along with retain while uploading option to ensure all images get synced to the cloud
4. Local categorization or domain and labelling can be implemented using module that can read these images into UX.  The label data will be associated to the image URI along with the coordinates and category.
5. As Label data needs to be saved, a local database is preferred to store this metadata as it will allow easy lookup for the UX and can be synced to cloud via telemetry messages.
6. During scoring run, the model will detect matching patterns and generate events of interest. This metadata will be sent to cloud via telemetry referring the image URI and optionally stored in local database for edge UX.  The images will continue to be stored to Edge Blob and synced with Azure Blob

## Alerts persistence

In the context of vision on edge, alerts is a response to an event that is triggered by the AI model (in other words, the inferencing results). The type of event is determined by the training imparted to the model. These events are separate from operational events raised by the processing pipeline and any related to the health of the runtime.

Some of the common alerts types are:

* Image classification
* Movement detection
* Direction of movement
* Object detection
* Count of objects
* Total Count of objects over period of time
* Average Count of objects over period of time

Alerts by their definition are required to be monitored as they drive certain actions. They are critical to operations, being time sensitive in terms of processing and required to be logged for audit and further analysis.

The persistence of alerts needs to happen locally on the edge where it is raised and then passed on to the cloud for further processing and storage. This is to ensure quick response locally and avoid losing critical alerts due to any transient failures.

Some options to achieve this persistence and cloud syncing are:

* Utilize built-in store and forward capability of IoT Edge runtime, which automatically gets synced with Azure IoT Hub in case of losing connectivity
* Persist alerts on host file system as log files, which can be synced periodically to a blob storage in cloud
* Utilized Azure Blob Edge module, which will sync this data to Azure Blob in cloud based on policies that can be configured
* Use local database on IoT Edge, such as SQL Edge for storing data, sync with Azure SQL DB using SQL Data Sync.  Other lightweight database option is SQLite

The preferred option is to use the built-in store and forward capability of IoT Edge runtime. This is more suitable for the alerts due to its time sensitivity,typically small messages sizes, and ease of use.

## User Interface

The user interface requirements of an IoT solution will vary depending on the overall solution objectives. In general, there are four user interfaces that are commonly found on IoT solutions: Administrator, Operator, Consumer and Analytics. In this guidance, we are going to focus on simple operator’s user interface and visualization dashboard. We will provide a reference implementation of the latter two

* **Administrator:** Allows full access to device provisioning, device and solution configuration, user management etc. These features could be provided as part of one solution or as separate solutions.
* **Consumer:** Only applicable to consumer solution. They provide similar access to the operators’ solution but limited to devices owned by the user
* **Operator:** Provides centralize access to the operational components of the solutions which typically includes device management, alerts monitoring and configuration.  
* **Analytics:** Interactive dashboard which provide visualization of telemetry and other data / analysis.

### Technology Options

Power BI is a compelling option for our Analytics / Virtualization needs. It provides power features to create customizable, interactive dashboards. It also allows connectivity to many popular database systems and services. It is available as a managed service and as a self-hosted package. The former is the most popular and recommend options. With Power BI embedded you could add customer-facing reports, dashboards, and analytics in your own applications by using and branding Power BI as your own. Reduce developer resources by automating the monitoring, management, and deployment of analytics, while getting full control of Power BI features and intelligent analytics.

Another suitable technology for IoT visualizations is Azure Maps which allows you to create location-aware web and mobile applications using simple and secure geospatial services, APIs, and SDKs in Azure. Deliver seamless experiences based on geospatial data with built-in location intelligence from world-class mobility technology partners.

Azure App Service is a managed platform with powerful capabilities for building web and mobile apps for many platforms and mobile devices. It allows developers to quickly build, deploy, and scale web apps created with popular frameworks .NET, .NET Core, Node.js, Java, PHP, Ruby, or Python, in containers or running on any operating system. Meet rigorous, enterprise-grade performance, security, and compliance requirements by using the fully managed platform for your operational and monitoring tasks.

For real time data reporting, Azure SignalR Service, makes adding real-time communications to your web application is as simple as provisioning a service—no need to be a real-time communications guru! It easily integrates with services such as Azure Functions, Azure Active Directory, Azure Storage, Azure App Service, Azure Analytics, Power BI, IoT, Cognitive Services, Machine Learning, and more.
To secure your user interface solutions, The Azure Active Directory (Azure AD) enterprise identity service provides single sign-on and multi-factor authentication to help protect your users from 99.9 percent of cybersecurity attacks.

## Scenarios

### Use case 1

#### Overview

Contoso Boards produces high quality circuit boards used in computers. Their number one product is a motherboard. Lately they have been seeing an increase in issues with chip placement on the board. Through their investigation they have noticed that the circuit boards are getting placed incorrectly on the assembly line. They need a way to identify if the circuit board is placed on the assembly line correctly.   The data scientist at Contoso Boards are most familiar with TensorFlow and would like to continue using it as their primary ML model structure.  Contoso Boards has several assembly lines that produce these mother boards.  Contoso Boards would also like to centralized management of the entire solution.

#### Questions

What are we analyzing?

* Motherboard

Where are we going to be viewing the motherboard from?

* Assembly Line Conveyor belt

What camera do we need?

* Area or Line scan
* Color or Monochrome
* CCD or CMOS Sensor
* Global or rolling shutter
* Frame Rate
* Resolution

What type of lighting is needed?

* Backlighting
* Shade
* Darkfield

How should the camera be mounted?

* Top down
* Side view
* Angular

What hardware should be used?

* CPU
* FPGA
* GPU
* ASIC

#### Solution

Based on the overall solution that the Contoso Boards is looking for with this vision use case we should be looking for edge detection of the part.  Based on this we need to position a camera directly above the at 90 degrees and about 16 inches above the part. Since the conveyer system moves relatively slowly, we can use an Area Scan camera with a Global shutter. For this use case our camera should capture about 30 frames per second. As for the resolution using the formula of Res=(Object Size) Divided by (details to be captured). Based on the formula Res=16”/8” give 2MP in x and 4 in y so we need a camera capable of 4MP. As for the sensor type, we are not fast moving, and really looking for an edge detection, so a CCD sensor should be used. One of the more critical aspects for any vision workload is lighting. In this application Contoso Boards should choose to use a white filter back light. This will make the part look almost black and have a high amount of contrast for edge detection. When it comes to color options for this application it is better to be in black and white, as this is what will yield the sharpest edge for the detection AI model.   Looking at what kind of hard, the data scientist are most familiar with TensorFlow and learning ONNX or others would slow down the time for development of the model.  Also because there are several assembly lines that will use this solution, and Contoso Boards would like a centrally managed IoT Edge and Azure IoT would work well here.  Based on the workload, the fact that Contoso Boards already know TensorFlow, and this will be used on multiple assembly lines, GPU based hardware would be the choice for hardware acceleration.

#### Sample of what the camera would see

![motherboard](../media/MotherBoard1.jpg)

### Use Case 2

#### Overview

Contoso Shipping recently has had several pedestrian accidents at their loading docks. Most of the accidents are happening when a truck leaves the loading dock, and the driver does not see a dock worker walking in front of the truck. Contoso Shipping would like a solution that would watch for people, predict the direction of travel, and warn the drivers of potential dangers of hitting the workers.  The distance from the cameras to Contoso Shipping's server room is to far for GigE connectivity, however they do have a large WIFI mesh that could be used for connectivity.  Most of the data scientist that Contoso Shipping employ are familiar with Open-VINO and they would like to be able to reuse the models on additional hardware in the future.  The solution will also need to ensure that devices are operating as power efficiently as possible.  Finally, Contoso Shipping needs a way to manage the solution remotely for updates.  

#### Questions

What are we analyzing?

* People and patterns of movement

Where are we going to be viewing the people from?

* The loading docks are 165 feet long
* Cameras will be placed 17 feet high to keep with city ordnances.
* Cameras will need to be positioned 100 feet away from the front of the trucks.
* Camera focus will need to be 10 feet behind the front of the truck, and 10 additional feet in front of the truck, giving us a 20 foot depth on focus.

What camera do we need?

* Area or Line scan
* Color or Monochrome
* CCD or CMOS Sensor
* Global or rolling shutter
* Frame Rate
* Resolution

What type of lighting is needed?

* Backlighting
* Shade
* Darkfield

What hardware should be used?

* CPU
* FPGA
* GPU
* ASIC

How should the camera be mounted?

* Top down
* Side view
* Angular

#### Solution

Based on the distance of the loading dock size Contoso Shipping will require several cameras to cover the entire dock. Based on zoning laws that Contoso Shipping must adhere to require that the surveillance cameras can not be mounted higher that 20 feet. In this use case the average size of a worker is 5 foot 8 inches. The solution must use the least number of cameras as possible.

Formula:

![field of view](/media/fieldofview.png)

For an example if we look at the following images:

Taken with 480 horizontal pixels at 20 foot

![car1](/media/Car1.png)

Taken with 5184 horizontal pixels at 20 foot

![car2](../media/Car2.png)

The red square is shown to illustrate one pixel color.

*Note: This is the issue with using the wrong resolution camera for a given use case. Lens can impact the FOV, however, if the wrong sensor is used for that given use case the results could be less than expected.*

With the above in mind, when choosing a camera for the overall solution required for Contoso Shipping, we need to think about how many cameras and at what resolution is needed to get the correct amount of details to detect a person. Since we are only trying to identify if a person is in the frame or not, our PPF does not need to be around 80 (which is what is about needed for facial identification) and we can use somewhere around 15-20. That would place the FOV something 16 foot. 16-foot FOV would give us about 17.5 pixels per foot…which fits within our required PPF of 15-20. This would mean that we need a 10MP camera that has a horizontal resolution of ~5184 pixels, and a lens that would allow for a FOV of 16 feet. When looking at the solution the cameras would need to be placed outside, and the choice of sensor type should not allow for “bloom”. Bloom is when light hits the sensor and overloads the sensor with light…this causes a view of almost over exposure or a “white out” kind of condition. CMOS is the choice here. Contoso operates 24x7 and as such needs to ensure that nighttime personal are also protected. When looking at color vs Monochrome, Monochrome handles low light conditions much better, and we are not looking to identify a person based on color monochrome sensors are a little cheaper as well. How many cameras will it take, since we have figured out that our cameras can look at a 16 foot path it is just simple math. 165 foot dock divided by 16 foot FOV gives us 10.3125 cameras. So the solution would need 11 Monochrome 5184 horizontal pixel (or 10MP) CMOS cameras with IPX67 housings or weather boxes. The cameras would be mounted on 11 poles 100 feet from the trucks at 17f high.  Based on the fact that the data scientist are more familiar with Open-VINO data models should be built in ONNX.  When looking for what hardware should be used, they need a device that can be connected over WIFI, and use as little power as possible.  Based on this they should look to an FPGA processor, an ASIC processor would also work, but due to the nature of how an ASIC processor works it would not meet the requirement of being able to use the models on different hardware in the future.

![camera mount](/media/TruckPersonCameraMount.png)
