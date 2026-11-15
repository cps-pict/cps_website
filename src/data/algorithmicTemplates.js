export const templateCategories = [
  "All",
  "Binary Search",
  "Two Pointers",
  "Sliding Window",
  "Prefix Sums",
  "BFS and DFS",
  "Dijkstra's Algorithm",
  "Disjoint Set Union (DSU)",
  "Common Dynamic Programming"
];

export const algorithmicTemplates = [
  // 1. Binary Search
  {
    id: "bs-monotonic-answer",
    category: "Binary Search",
    title: "Binary Search on Monotonic Answer Space",
    summary: "Transforming an optimization problem into a monotonic feasibility check.",
    whenToUse:
      "Use when asked to minimize a maximum or maximize a minimum value over a continuous or integer search range, where check(mid) is monotonic (e.g. FFFFTTTT).",
    timeComplexity: "O(N · log(high - low))",
    spaceComplexity: "O(1) auxiliary",
    codeSnippet: `// Minimizing X such that check(X) is true (Predicate: F F F ... T T T)
long long low = min_val, high = max_val, ans = high;

while (low <= high) {
    long long mid = low + (high - low) / 2;
    if (check(mid)) {
        ans = mid;         // Feasible: record answer and search lower half
        high = mid - 1;
    } else {
        low = mid + 1;     // Infeasible: must search upper half
    }
}
return ans;`
  },
  {
    id: "bs-lower-upper-bound",
    category: "Binary Search",
    title: "Lower Bound & Upper Bound on Sorted Array",
    summary: "Finding first element ≥ target or > target in logarithmic time.",
    whenToUse:
      "Use on sorted arrays or monotonic indexed sequences to locate insertion points or count range frequencies in O(log N).",
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    codeSnippet: `// Lower Bound: first index with a[i] >= target (returns n if none)
int lower_bound_custom(const vector<int>& a, int target) {
    int low = 0, high = (int)a.size() - 1, ans = a.size();
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (a[mid] >= target) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}`
  },

  // 2. Two Pointers
  {
    id: "tp-opposite-direction",
    category: "Two Pointers",
    title: "Opposite-Direction Two Pointers (Sorted Target Pair)",
    summary: "Converging pointers from both ends of a sorted array to find target sums or pairs.",
    whenToUse:
      "Use when an array is sorted and you need to find two elements meeting an equality or inequality bound (e.g. Two Sum, 3Sum inner loop, container with most water).",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    codeSnippet: `// Find indices {l, r} such that a[l] + a[r] == target in a sorted array
int l = 0, r = (int)a.size() - 1;
while (l < r) {
    long long sum = (long long)a[l] + a[r];
    if (sum == target) {
        return {l, r};
    } else if (sum < target) {
        l++; // Sum is too small: advance left pointer to increase sum
    } else {
        r--; // Sum is too large: decrement right pointer to decrease sum
    }
}
return {-1, -1};`
  },
  {
    id: "tp-fast-slow",
    category: "Two Pointers",
    title: "Fast & Slow Pointers (In-Place Array Deduplication & Merging)",
    summary: "Two pointers advancing in the same direction at different speeds to filter or compact elements.",
    whenToUse:
      "Use for in-place array modification without extra memory allocation, such as removing duplicates or compacting specific values.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    codeSnippet: `// Deduplicate sorted array in-place; returns the new logical length
int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;
    int write = 0;
    for (int read = 1; read < (int)nums.size(); read++) {
        if (nums[read] != nums[write]) {
            nums[++write] = nums[read];
        }
    }
    return write + 1;
}`
  },

  // 3. Sliding Window
  {
    id: "sw-fixed-size",
    category: "Sliding Window",
    title: "Fixed-Size Sliding Window (Window Size K)",
    summary: "Maintaining cumulative state over all contiguous subarrays of exact length K.",
    whenToUse:
      "Use when computing moving averages, maximum/minimum sums, or anagram frequencies over an invariant interval length K.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1) auxiliary",
    codeSnippet: `// Maximum sum of any contiguous subarray of exact length k
long long cur_sum = 0;
for (int i = 0; i < k; i++) cur_sum += a[i];
long long max_sum = cur_sum;

for (int i = k; i < n; i++) {
    cur_sum += a[i] - a[i - k]; // Add incoming element, subtract exiting element
    max_sum = max(max_sum, cur_sum);
}`
  },
  {
    id: "sw-variable-size",
    category: "Sliding Window",
    title: "Variable-Size Sliding Window (Expansion & Contraction)",
    summary: "Dynamically expanding right pointer and contracting left pointer to maintain an invariant.",
    whenToUse:
      "Use when finding the longest or shortest contiguous subarray where a condition holds (e.g. sum ≤ S, at most K unique characters).",
    timeComplexity: "Amortized O(N)",
    spaceComplexity: "O(Σ) frequency map",
    codeSnippet: `// Longest valid contiguous subarray
int left = 0, max_len = 0;
for (int right = 0; right < n; right++) {
    add(a[right]); // Expand window: include element at right

    // Shrink window from left until invariant condition is restored
    while (left <= right && !isValid()) {
        remove(a[left++]);
    }

    max_len = max(max_len, right - left + 1);
}`
  },

  // 4. Prefix Sums
  {
    id: "prefix-sum-1d",
    category: "Prefix Sums",
    title: "1D Prefix Sums (Constant Time Range Sum Queries)",
    summary: "Cumulative running sum preprocessing to answer arbitrary range queries in O(1).",
    whenToUse:
      "Use when an array is static and multiple range sum queries [L, R] must be computed without modifying values.",
    timeComplexity: "Preprocessing: O(N), Query: O(1)",
    spaceComplexity: "O(N)",
    codeSnippet: `// 1-indexed Prefix Sum Array
vector<long long> pref(n + 1, 0);
for (int i = 0; i < n; i++) {
    pref[i + 1] = pref[i] + a[i];
}

// Query sum in range [l, r] (0-indexed inclusive)
auto query = [&](int l, int r) -> long long {
    return pref[r + 1] - pref[l];
};`
  },
  {
    id: "prefix-sum-2d",
    category: "Prefix Sums",
    title: "2D Prefix Sums (Matrix Subgrid Query)",
    summary: "Inclusion-exclusion preprocessing for rectangular subgrid queries in O(1).",
    whenToUse:
      "Use when repeatedly calculating the sum of elements within any rectangular subgrid (r1, c1) to (r2, c2).",
    timeComplexity: "Preprocessing: O(R · C), Query: O(1)",
    spaceComplexity: "O(R · C)",
    codeSnippet: `// 1-indexed 2D Prefix Sums
vector<vector<long long>> pref(R + 1, vector<long long>(C + 1, 0));
for (int r = 0; r < R; r++) {
    for (int c = 0; c < C; c++) {
        pref[r + 1][c + 1] = grid[r][c] + pref[r][c + 1] + pref[r + 1][c] - pref[r][c];
    }
}

// Query submatrix sum (r1, c1) to (r2, c2) (0-indexed inclusive)
auto query2D = [&](int r1, int c1, int r2, int c2) -> long long {
    return pref[r2 + 1][c2 + 1] - pref[r1][c2 + 1] - pref[r2 + 1][c1] + pref[r1][c1];
};`
  },

  // 5. BFS and DFS
  {
    id: "bfs-shortest-path",
    category: "BFS and DFS",
    title: "Breadth-First Search (BFS) on Unweighted Graphs / Grids",
    summary: "Level-order queue traversal to determine the shortest path in unweighted structures.",
    whenToUse:
      "Use when finding the minimum number of steps or shortest distance between nodes in an unweighted graph or 2D grid.",
    timeComplexity: "O(V + E) or O(R · C)",
    spaceComplexity: "O(V) queue and distance array",
    codeSnippet: `vector<int> dist(n, -1);
queue<int> q;

dist[start_node] = 0;
q.push(start_node);

while (!q.empty()) {
    int u = q.front(); q.pop();

    for (int v : adj[u]) {
        if (dist[v] == -1) {
            dist[v] = dist[u] + 1;
            q.push(v);
        }
    }
}`
  },
  {
    id: "dfs-traversal",
    category: "BFS and DFS",
    title: "Depth-First Search (DFS) & Connected Components",
    summary: "Recursive exploration to visit connected components, detect cycles, or traverse trees.",
    whenToUse:
      "Use for connectivity checks, counting connected components, topological sorting, and recursive tree traversals.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V) recursion call stack",
    codeSnippet: `vector<bool> visited(n, false);

void dfs(int u, const vector<vector<int>>& adj) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v, adj);
        }
    }
}

// Count connected components in an undirected graph
int components = 0;
for (int i = 0; i < n; i++) {
    if (!visited[i]) {
        components++;
        dfs(i, adj);
    }
}`
  },

  // 6. Dijkstra's Algorithm
  {
    id: "dijkstra-shortest-path",
    category: "Dijkstra's Algorithm",
    title: "Dijkstra's Single-Source Shortest Path (Min-Priority Queue)",
    summary: "Greedy shortest path exploration on graphs with non-negative edge weights.",
    whenToUse:
      "Use when finding the shortest distance from a source node to all other nodes on graphs where edge weights are non-negative.",
    timeComplexity: "O((V + E) · log V)",
    spaceComplexity: "O(V + E)",
    codeSnippet: `const long long INF = 1e18;
vector<long long> dist(n, INF);
priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;

dist[source] = 0;
pq.push({0, source});

while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d > dist[u]) continue; // Discard stale entry

    for (auto& [v, weight] : adj[u]) {
        if (dist[u] + weight < dist[v]) {
            dist[v] = dist[u] + weight;
            pq.push({dist[v], v});
        }
    }
}`
  },

  // 7. Disjoint Set Union (DSU)
  {
    id: "dsu-union-by-size",
    category: "Disjoint Set Union (DSU)",
    title: "Disjoint Set Union (DSU) with Path Compression & Union by Size",
    summary: "Near-constant time partition tracking and set merging data structure.",
    whenToUse:
      "Use for dynamic connectivity queries, cycle detection in undirected graphs, and Kruskal's Minimum Spanning Tree algorithm.",
    timeComplexity: "O(α(N)) amortized (~O(1) per operation)",
    spaceComplexity: "O(N)",
    codeSnippet: `struct DSU {
    vector<int> parent, sz;
    DSU(int n) : parent(n), sz(n, 1) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        return (parent[x] == x) ? x : (parent[x] = find(parent[x])); // Path compression
    }
    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (sz[a] < sz[b]) swap(a, b);
        parent[b] = a;
        sz[a] += sz[b]; // Union by size
        return true;
    }
    bool same(int a, int b) { return find(a) == find(b); }
};`
  },

  // 8. Common Dynamic Programming
  {
    id: "dp-01-knapsack",
    category: "Common Dynamic Programming",
    title: "0/1 Knapsack Pattern (Space-Optimized 1D Vector)",
    summary: "Classic subset selection DP maximizing value subject to a capacity constraint.",
    whenToUse:
      "Use when each item can be chosen at most once and you must optimize total profit/weight within a capacity limit W.",
    timeComplexity: "O(N · W)",
    spaceComplexity: "O(W)",
    codeSnippet: `// dp[w] stores max value achievable with capacity w
vector<long long> dp(W + 1, 0);

for (int i = 0; i < n; i++) {
    // Iterate capacity backwards so each item is used at most once
    for (int w = W; w >= weight[i]; w--) {
        dp[w] = max(dp[w], dp[w - weight[i]] + value[i]);
    }
}
long long max_value = dp[W];`
  },
  {
    id: "dp-lcs",
    category: "Common Dynamic Programming",
    title: "Longest Common Subsequence (LCS) / 2D Grid DP",
    summary: "Optimal substructure formulation for string comparison and subsequence matching.",
    whenToUse:
      "Use when finding the longest common subsequence, minimum insertions/deletions, or edit distance between two sequences.",
    timeComplexity: "O(N · M)",
    spaceComplexity: "O(N · M)",
    codeSnippet: `int n = s.size(), m = t.size();
vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= m; j++) {
        if (s[i - 1] == t[j - 1]) {
            dp[i][j] = 1 + dp[i - 1][j - 1];
        } else {
            dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
}
int lcs_length = dp[n][m];`
  }
];
