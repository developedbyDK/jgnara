"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProfileTab } from "./profile-tab";
import { MyListingsTab } from "./my-listings-tab";
import { MyPostsTab } from "./my-posts-tab";
import { CreditsTab } from "./credits-tab";
import { MyRecruitsTab } from "./my-recruits-tab";
import { CompanyTab } from "./company-tab";
import { IconLogin } from "@tabler/icons-react";
import Link from "next/link";

type UserProfile = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  company: string | null;
  avatar_url: string | null;
  credits: number;
  created_at: string;
};

export function MypageContent() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasCompany, setHasCompany] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [loadedTabs, setLoadedTabs] = useState<Set<string>>(
    new Set(["profile"]),
  );

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile({
          ...profileData,
          email: user.email ?? profileData.email,
        });
      }

      // Check if user has a company
      const { count } = await supabase
        .from("companies")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id);

      setHasCompany((count ?? 0) > 0);
      setLoading(false);
    }
    fetchUser();
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setLoadedTabs((prev) => new Set(prev).add(value));
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-12 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800" />
        <div className="h-64 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900">
        <IconLogin className="h-10 w-10 text-neutral-400" />
        <div className="text-center">
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">
            로그인이 필요합니다
          </p>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            마이페이지를 이용하려면 먼저 로그인해주세요.
          </p>
        </div>
        <Link
          href="/login"
          className="cursor-pointer rounded-lg bg-orange-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-orange-700"
        >
          로그인하기
        </Link>
      </div>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <TabsList
        variant="line"
        className="w-full flex-wrap gap-0 border-b border-neutral-200 dark:border-neutral-800"
      >
        <TabsTrigger value="profile" className="cursor-pointer">
          프로필
        </TabsTrigger>
        <TabsTrigger value="listings" className="cursor-pointer">
          내 매물
        </TabsTrigger>
        <TabsTrigger value="posts" className="cursor-pointer">
          내 게시글
        </TabsTrigger>
        <TabsTrigger value="credits" className="cursor-pointer">
          포인트 내역
        </TabsTrigger>
        <TabsTrigger value="recruits" className="cursor-pointer">
          내 구인공고
        </TabsTrigger>
        {hasCompany && (
          <TabsTrigger value="company" className="cursor-pointer">
            업체정보
          </TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="profile" className="mt-6">
        {loadedTabs.has("profile") && (
          <ProfileTab profile={profile} onUpdate={setProfile} />
        )}
      </TabsContent>

      <TabsContent value="listings" className="mt-6">
        {loadedTabs.has("listings") && (
          <MyListingsTab userId={profile.id} />
        )}
      </TabsContent>

      <TabsContent value="posts" className="mt-6">
        {loadedTabs.has("posts") && <MyPostsTab userId={profile.id} />}
      </TabsContent>

      <TabsContent value="credits" className="mt-6">
        {loadedTabs.has("credits") && (
          <CreditsTab userId={profile.id} credits={profile.credits} />
        )}
      </TabsContent>

      <TabsContent value="recruits" className="mt-6">
        {loadedTabs.has("recruits") && (
          <MyRecruitsTab userId={profile.id} />
        )}
      </TabsContent>

      {hasCompany && (
        <TabsContent value="company" className="mt-6">
          {loadedTabs.has("company") && (
            <CompanyTab userId={profile.id} />
          )}
        </TabsContent>
      )}
    </Tabs>
  );
}
