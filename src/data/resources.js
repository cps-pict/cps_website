export const contestTemplate = `#include <bits/stdc++.h>
using namespace std;

#define fast_io ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
#define all(v) (v).begin(), (v).end()
#define rall(v) (v).rbegin(), (v).rend()
#define sz(x) (int)(x).size()
#define nl '\\n'

using ll = long long;
using ld = long double;
const ll INF = 1e18;
const int MOD = 1e9 + 7;

void solve() {
    // Problem solution logic here
}

int main() {
    fast_io;
    int t = 1;
    cin >> t;
    while (t--) {
        solve();
    }
    return 0;
}`;

export const subjectRoadmaps = [
  {
    id: "roadmap-arrays",
    title: "1. Arrays, Two Pointers & Sliding Window",
    tier: "Foundational to Intermediate",
    tags: ["Monotonicity", "Interval Invariants", "Prefix Sums"],
    summary: "Essential for 70%+ of online assessments. Master running prefix queries, two pointers opposite-end scans, and variable-length sliding window state maintenance.",
    keyConcepts: [
      "Prefix Sums & Difference Arrays for O(1) range updates",
      "Two pointers on sorted arrays (pair search, 3Sum, partition)",
      "Fixed window vs variable-size window with dynamic invariants",
      "Dutch National Flag and three-way partitioning"
    ],
    recommendedProblems: [
      { name: "Two Sum II (LC 167)", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
      { name: "Subarray Product Less Than K (LC 713)", url: "https://leetcode.com/problems/subarray-product-less-than-k/" },
      { name: "Books (CF 279B)", url: "https://codeforces.com/problemset/problem/279/B" }
    ]
  },
  {
    id: "roadmap-bs",
    title: "2. Binary Search & Monotonic Predicates",
    tier: "Fundamental to Advanced",
    tags: ["Search on Answer", "check(mid)", "Minimax"],
    summary: "Expand binary search beyond sorted arrays into any function that maps values to boolean states {F, F, ..., T, T}. Crucial for capacity and allocation problems.",
    keyConcepts: [
      "Standard BS: preventing (low + high) overflow with low + (high - low) / 2",
      "Binary Search on Answer Space: identifying monotonic feasibility conditions",
      "Floating point binary search with fixed iterations (e.g. 100 steps)",
      "Ternary Search on strictly unimodal or convex functions"
    ],
    recommendedProblems: [
      { name: "Aggressive Cows (SPOJ)", url: "https://www.spoj.com/problems/AGGRCOW/" },
      { name: "Koko Eating Bananas (LC 875)", url: "https://leetcode.com/problems/koko-eating-bananas/" },
      { name: "Factory Machines (CSES 1620)", url: "https://cses.fi/problemset/task/1620" }
    ]
  },
  {
    id: "roadmap-dp",
    title: "3. Dynamic Programming & Memoization",
    tier: "Intermediate to Advanced",
    tags: ["Optimal Substructure", "State Transitions", "Bitmask"],
    summary: "Break complex recursive problems into overlapping subproblems. From standard 1D/2D grids to knapsack variations, interval DP, and state compression.",
    keyConcepts: [
      "0/1 Knapsack, Unbounded Knapsack, and Subset Sum variations",
      "Longest Common Subsequence (LCS) and Longest Increasing Subsequence (LIS)",
      "DP on Trees: rerooting technique and subtree values",
      "Bitmask DP: representing states with bit manipulation up to N <= 20"
    ],
    recommendedProblems: [
      { name: "Coin Change (LC 322)", url: "https://leetcode.com/problems/coin-change/" },
      { name: "Partition Equal Subset Sum (LC 416)", url: "https://leetcode.com/problems/partition-equal-subset-sum/" },
      { name: "Frog 1 & 2 (AtCoder DP Contest)", url: "https://atcoder.jp/contests/dp/tasks/dp_a" }
    ]
  },
  {
    id: "roadmap-graphs",
    title: "4. Graph Theory, Trees & DSU",
    tier: "Intermediate to Advanced",
    tags: ["BFS/DFS", "Dijkstra", "Disjoint Set Union", "Trees"],
    summary: "Graph representations, path finding, shortest path algorithms, cycle detection, topological ordering, and Disjoint Set Union with path compression.",
    keyConcepts: [
      "BFS for unweighted shortest paths and multi-source propagation",
      "DFS recursion stack, articulation points, and bridges (Tarjan's)",
      "Dijkstra with priority_queue (handling negative weights warning)",
      "Disjoint Set Union (DSU) with union by rank & path compression in amortized O(α(N))"
    ],
    recommendedProblems: [
      { name: "Course Schedule II (LC 210)", url: "https://leetcode.com/problems/course-schedule-ii/" },
      { name: "Network Delay Time (LC 743)", url: "https://leetcode.com/problems/network-delay-time/" },
      { name: "Road Reparation - MST (CSES 1675)", url: "https://cses.fi/problemset/task/1675" }
    ]
  }
];

export const platformGuides = [
  {
    name: "Codeforces",
    badge: "Contest Platform",
    url: "https://codeforces.com",
    focus: "Speed, Mathematical Intuition & Ad-Hoc Thinking",
    description: "The gold standard for competitive programming contests. Participate in Division 2 and Division 3 rounds to master fast coding and edge case handling."
  },
  {
    name: "CSES Problem Set",
    badge: "Core Curriculum",
    url: "https://cses.fi/problemset/",
    focus: "300 Classical Algorithmic Benchmark Problems",
    description: "Every problem has clean statements without story overhead. Must-solve for mastering DP, Graphs, Tree Algorithms, and Range Queries."
  },
  {
    name: "USACO Guide",
    badge: "Free Interactive Syllabus",
    url: "https://usaco.guide/",
    focus: "Bronze to Platinum Structured Learning Paths",
    description: "Incredible curriculum with theory explanations, practice problem ladders, code solutions in C++, and editorial discussions."
  },
  {
    name: "CP-Algorithms",
    badge: "Reference Encyclopedia",
    url: "https://cp-algorithms.com/",
    focus: "Exhaustive Mathematical & Algorithmic Proofs",
    description: "Comprehensive coverage of Number Theory, String Processing (KMP, Z-algorithm), Geometry, and Advanced Graph Algorithms."
  },
  {
    name: "AtCoder",
    badge: "High Quality Tasks",
    url: "https://atcoder.jp/",
    focus: "Educational Contest Tasks & Clean Solutions",
    description: "Renowned for clean problem statements, high quality math tasks, and the widely acclaimed Educational DP Contest."
  },
  {
    name: "LeetCode",
    badge: "Interview & OA Hub",
    url: "https://leetcode.com",
    focus: "Online Assessments & Technical Interviews",
    description: "Company-tagged problems and daily POTDs essential for placement rounds and software engineering internship interviews."
  }
];

export const potdArchive = [
  {
    date: "Nov 03, 2026",
    title: "Delete Characters to Make Fancy String",
    platform: "LeetCode 1957",
    difficulty: "Easy",
    url: "https://leetcode.com/problems/delete-characters-to-make-fancy-string/",
    tags: ["Strings", "Two Pointers"],
    videoUrl: "https://youtube.com",
    keyInsight: "Linear pass checking if currentChar == s[i-1] == s[i-2]. If true, skip; else append to result."
  },
  {
    date: "Nov 02, 2026",
    title: "Circular Sentence",
    platform: "LeetCode 2490",
    difficulty: "Easy",
    url: "https://leetcode.com/problems/circular-sentence/",
    tags: ["Strings", "Validation"],
    videoUrl: "https://youtube.com",
    keyInsight: "Verify first and last character match, then check boundary letters around spaces."
  },
  {
    date: "Nov 01, 2026",
    title: "Minimum Total Distance Traveled",
    platform: "LeetCode 2463",
    difficulty: "Hard",
    url: "https://leetcode.com/problems/minimum-total-distance-traveled/",
    tags: ["Dynamic Programming", "Sorting"],
    videoUrl: "https://youtube.com",
    keyInsight: "Sort robots and factory positions. dp[i][j] represents min distance pairing robot i using factory subset j."
  },
  {
    date: "Oct 31, 2026",
    title: "Minimum Number of Removals to Make Mountain Array",
    platform: "LeetCode 1671",
    difficulty: "Hard",
    url: "https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array/",
    tags: ["LIS", "Binary Search", "Dynamic Programming"],
    videoUrl: "https://youtube.com",
    keyInsight: "Compute LIS from left and LIS from right. Peak index i must satisfy lis_left[i] > 1 and lis_right[i] > 1."
  },
  {
    date: "Oct 30, 2026",
    title: "Minimum Number of Days to Make m Bouquets",
    platform: "LeetCode 1482",
    difficulty: "Medium",
    url: "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
    tags: ["Binary Search on Answer"],
    videoUrl: "https://youtube.com",
    keyInsight: "Binary search on days [min(bloomDay), max(bloomDay)]. check(days) counts adjacent bloom windows."
  }
];

