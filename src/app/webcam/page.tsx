import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import Navbar from '../../components/Navbar';
//import Footer from "../../components/Footer";
import WebcamFocusPeaking from '../../components/WebCam';

export default function WebcamPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-4">
        <Card>
          <CardHeader>
            <CardTitle>Webcam Focus Peaking</CardTitle>
            <CardDescription>
              Focus peaking demo using the Sobel algorithm on webcam feed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WebcamFocusPeaking />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
