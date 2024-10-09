import React, { useState } from 'react';
import { fetchXProfile, generateRoast } from '../services/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { FaTwitter, FaSpinner } from 'react-icons/fa';

const ProfileRoaster: React.FC = () => {
  const [username, setUsername] = useState('');
  const [roast, setRoast] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoast = async () => {
    setLoading(true);
    setError('');
    setRoast('');

    try {
      const profile = await fetchXProfile(username);
      const generatedRoast = await generateRoast(profile);
      setRoast(generatedRoast);
    } catch (err) {
      setError('Failed to fetch profile or generate roast. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-800 text-white shadow-lg hover:shadow-primary/50 transition-shadow duration-300 rounded-xl border border-gray-700 transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Roast an X Profile</CardTitle>
        <p className="text-gray-400 text-center text-sm">Enter a username and watch the flames rise!</p>
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
            onClick={handleRoast} 
            disabled={loading || !username}
            className="w-full bg-primary hover:bg-primary/90 transition-colors duration-300"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Roasting...
              </>
            ) : (
              'Roast!'
            )}
          </Button>
          {error && (
            <Alert variant="destructive" className="animate-shake">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {roast && (
            <Alert className="bg-gray-700 border-gray-600 animate-fadeIn">
              <AlertDescription className="italic text-lg text-white">{roast}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileRoaster;