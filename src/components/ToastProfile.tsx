import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { FaTwitter, FaFire } from 'react-icons/fa';

const ToastProfile: React.FC = () => {
  const [username, setUsername] = useState('');
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleToast = async () => {
    setLoading(true);
    setError('');
    setToast('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setToast(`${username} just got toasted! Their tweets are so hot, they're practically on fire! 🔥`);
    } catch (err) {
      setError('Failed to toast profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-800 text-white shadow-lg hover:shadow-orange-500/50 transition-shadow duration-300 rounded-xl border border-gray-700 transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Toast an X Profile</CardTitle>
        <p className="text-gray-400 text-center text-sm">Enter a username and watch them get toasted!</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <FaTwitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter X username"
              className="bg-gray-700 text-white placeholder-gray-400 border-gray-600 pl-10"
            />
          </div>
          <Button 
            onClick={handleToast} 
            disabled={loading || !username}
            className="w-full bg-orange-500 hover:bg-orange-600 transition-colors duration-300"
          >
            {loading ? (
              <>
                <FaFire className="animate-spin mr-2" />
                Toasting...
              </>
            ) : (
              'Toast!'
            )}
          </Button>
          {error && (
            <Alert variant="destructive" className="animate-shake">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {toast && (
            <Alert className="bg-gray-700 border-gray-600 animate-fadeIn">
              <AlertDescription className="italic text-lg text-white">{toast}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ToastProfile;