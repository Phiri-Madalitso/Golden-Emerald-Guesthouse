# Golden Emerald Guest House

A website for Golden Emerald Guest House, a family-run guest house on the M18 in Zambia. The goal is to make the business easier to find online and help it get more bookings.

![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core_Razor_Pages-512BD4?logo=dotnet&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?logo=csharp&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

![Front view of the guest house](WebApplication1/wwwroot/images/front-view.png)

## Features

- Landing page with an introduction to the guest house
- Room overview with rates (Standard, Family and Executive)
- Amenities and on-site food section
- Photo gallery
- Location section with an embedded Google Map
- Booking by phone and WhatsApp
- Responsive layout for mobile and desktop

## Tech stack

- ASP.NET Core Razor Pages (.NET 10)
- C#
- HTML and CSS

## Running locally

**Requirements:** [.NET 10 SDK](https://dotnet.microsoft.com/download)

```bash
git clone https://github.com/Phiri-Madalitso/Golden-Emerald-Guesthouse.git
cd Golden-Emerald-Guesthouse/WebApplication1
dotnet run
```

Then open the URL shown in the terminal.

## Project structure

```
WebApplication1/
├── Pages/          Razor Pages (Index, Privacy, Error, shared layout)
├── wwwroot/        Static files: CSS, JavaScript and images
└── Program.cs      App startup and request pipeline
```
