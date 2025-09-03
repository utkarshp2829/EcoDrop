import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { rewards, userProfile } from '@/lib/mockData';
import rewardsImage from '@/assets/eco-rewards.jpg';
import { 
  Gift,
  Star,
  CheckCircle,
  Clock,
  Tag,
  Zap,
  ArrowRight,
  Trophy
} from 'lucide-react';

export const RewardsPage = () => {
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [showRedeemDialog, setShowRedeemDialog] = useState(false);
  const [redeemedReward, setRedeemedReward] = useState<any>(null);

  const handleRedeem = (reward: any) => {
    if (userProfile.pointsBalance >= reward.pointsCost) {
      setRedeemedReward({
        ...reward,
        couponCode: `ECO${Date.now().toString(36).toUpperCase()}`,
        redeemedAt: new Date().toISOString()
      });
      setShowRedeemDialog(true);
      setSelectedReward(null);
    }
  };

  const canAfford = (pointsCost: number) => userProfile.pointsBalance >= pointsCost;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src={rewardsImage} alt="Rewards" className="w-16 h-16 rounded-full" />
            <h1 className="text-3xl font-bold text-foreground">Rewards Store</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            Redeem your eco-points for amazing rewards from local partners
          </p>
          
          {/* Points Balance */}
          <Card className="max-w-md mx-auto shadow-card-eco bg-gradient-primary text-primary-foreground">
            <CardContent className="pt-6">
              <div className="text-center">
                <Gift className="h-12 w-12 mx-auto mb-3" />
                <p className="text-primary-foreground/80 mb-1">Your Points Balance</p>
                <p className="text-4xl font-bold">{userProfile.pointsBalance}</p>
                <p className="text-sm text-primary-foreground/80 mt-2">
                  Keep recycling to earn more points! 🌱
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Reward */}
        <Card className="mb-8 shadow-eco bg-gradient-card overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <CardContent className="p-8">
              <Badge variant="secondary" className="mb-4 bg-warning text-warning-foreground">
                <Star className="h-3 w-3 mr-1" />
                Featured Reward
              </Badge>
              <h2 className="text-2xl font-bold mb-4">Eco-Friendly Products Pack</h2>
              <p className="text-muted-foreground mb-6">
                Complete sustainable living starter kit with reusable bags, bamboo utensils, 
                stainless steel water bottle, and more eco-friendly essentials.
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  <Gift className="h-4 w-4 text-primary" />
                  <span className="font-medium">750 points</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">EcoLife Store</span>
                </div>
              </div>
              <Button 
                variant="hero" 
                size="lg"
                disabled={!canAfford(750)}
                onClick={() => setSelectedReward(rewards.find(r => r.id === 'reward-4'))}
              >
                {canAfford(750) ? (
                  <>
                    <Zap className="h-5 w-5 mr-2" />
                    Redeem Now
                  </>
                ) : (
                  <>
                    <Clock className="h-5 w-5 mr-2" />
                    Need {750 - userProfile.pointsBalance} more points
                  </>
                )}
              </Button>
            </CardContent>
            <div className="relative bg-gradient-to-br from-success/20 to-accent/20 flex items-center justify-center p-8">
              <div className="text-8xl opacity-50">🌱</div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </Card>

        {/* Rewards Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">All Rewards</h2>
            <Badge variant="outline" className="text-muted-foreground">
              {rewards.length} available
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <Card 
                key={reward.id} 
                className={`shadow-card-eco transition-spring hover:shadow-eco cursor-pointer ${
                  !canAfford(reward.pointsCost) ? 'opacity-60' : 'hover:scale-105'
                }`}
                onClick={() => canAfford(reward.pointsCost) && setSelectedReward(reward)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-3xl mb-2">{reward.image}</div>
                    <Badge 
                      variant={canAfford(reward.pointsCost) ? 'default' : 'secondary'}
                      className="ml-2"
                    >
                      {reward.pointsCost} pts
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{reward.name}</CardTitle>
                  <CardDescription>{reward.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">{reward.vendor}</span>
                    <span className="text-sm text-muted-foreground">
                      {reward.stock} left
                    </span>
                  </div>
                  <Button 
                    variant={canAfford(reward.pointsCost) ? 'default' : 'secondary'}
                    className="w-full"
                    disabled={!canAfford(reward.pointsCost)}
                  >
                    {canAfford(reward.pointsCost) ? (
                      <>
                        Redeem <ArrowRight className="h-4 w-4 ml-1" />
                      </>
                    ) : (
                      <>
                        <Clock className="h-4 w-4 mr-2" />
                        Need {reward.pointsCost - userProfile.pointsBalance} more
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How to Earn More Points */}
        <Card className="shadow-card-eco bg-gradient-card">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Trophy className="h-6 w-6 text-primary" />
              <span>How to Earn More Points</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="bg-gradient-primary p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl text-primary-foreground">🍶</span>
                </div>
                <h3 className="font-semibold mb-2">Recycle More</h3>
                <p className="text-sm text-muted-foreground">
                  Drop off more waste categories to earn points faster
                </p>
              </div>
              <div>
                <div className="bg-gradient-primary p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl text-primary-foreground">👥</span>
                </div>
                <h3 className="font-semibold mb-2">Refer Friends</h3>
                <p className="text-sm text-muted-foreground">
                  Invite friends and earn bonus points when they join
                </p>
              </div>
              <div>
                <div className="bg-gradient-primary p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl text-primary-foreground">📱</span>
                </div>
                <h3 className="font-semibold mb-2">Daily Challenges</h3>
                <p className="text-sm text-muted-foreground">
                  Complete eco-challenges for extra point bonuses
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reward Details Dialog */}
      {selectedReward && (
        <Dialog open={!!selectedReward} onOpenChange={() => setSelectedReward(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <span className="text-2xl">{selectedReward.image}</span>
                <span>{selectedReward.name}</span>
              </DialogTitle>
              <DialogDescription>{selectedReward.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Points Required:</span>
                  <span className="font-medium">{selectedReward.pointsCost}</span>
                </div>
                <div className="flex justify-between">
                  <span>Your Balance:</span>
                  <span className="font-medium">{userProfile.pointsBalance}</span>
                </div>
                <div className="flex justify-between">
                  <span>After Redemption:</span>
                  <span className="font-medium">
                    {userProfile.pointsBalance - selectedReward.pointsCost}
                  </span>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setSelectedReward(null)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="hero" 
                  className="flex-1"
                  onClick={() => handleRedeem(selectedReward)}
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Confirm Redeem
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Success Dialog */}
      {showRedeemDialog && redeemedReward && (
        <Dialog open={showRedeemDialog} onOpenChange={setShowRedeemDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-6 w-6 text-success" />
                <span>Reward Redeemed! 🎉</span>
              </DialogTitle>
            </DialogHeader>
            <div className="text-center space-y-4">
              <div className="text-4xl">{redeemedReward.image}</div>
              <div>
                <h3 className="font-semibold text-lg">{redeemedReward.name}</h3>
                <p className="text-muted-foreground">{redeemedReward.vendor}</p>
              </div>
              <div className="bg-success/10 p-4 rounded-lg">
                <p className="text-sm text-success-foreground mb-2">Your Coupon Code:</p>
                <p className="font-mono text-lg font-bold">{redeemedReward.couponCode}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Show this code at {redeemedReward.vendor} to claim your reward
              </p>
              <Button 
                variant="success" 
                className="w-full"
                onClick={() => setShowRedeemDialog(false)}
              >
                Awesome, Thanks!
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};