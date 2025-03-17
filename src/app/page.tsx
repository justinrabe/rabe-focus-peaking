import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import Navbar from '../components/Navbar';
import VideoPlayer from '../components/VideoPlayer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-4">
        <Card>
          <CardHeader>
            <CardTitle>Focus Peaking Demo</CardTitle>
            <CardDescription>
              focus peaking demo using the sobel algorithm
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VideoPlayer videoSrc="/exploreHD-Focus.mp4" />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
