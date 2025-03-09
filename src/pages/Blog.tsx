
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight, Tag } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "10 Simple Ways to Reduce Your Carbon Footprint",
    excerpt: "Small changes in your daily routine can make a big difference in reducing your environmental impact.",
    category: "Lifestyle",
    author: "Emily Green",
    date: "Aug 15, 2023",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: 2,
    title: "The Future of Renewable Energy: Trends to Watch",
    excerpt: "Exciting developments in renewable energy technology that are shaping a sustainable future.",
    category: "Technology",
    author: "Mark Solaris",
    date: "Jul 28, 2023",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 3,
    title: "Understanding Carbon Offsets: A Comprehensive Guide",
    excerpt: "Learn how carbon offset programs work and how to select effective ones for your business or personal use.",
    category: "Education",
    author: "Dr. James Wilson",
    date: "Jun 12, 2023",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 4,
    title: "Sustainable Fashion: Beyond the Greenwashing",
    excerpt: "How to identify truly sustainable fashion brands and make eco-friendly clothing choices.",
    category: "Lifestyle",
    author: "Sofia Chen",
    date: "May 20, 2023",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 5,
    title: "The Hidden Environmental Impact of Digital Technologies",
    excerpt: "How our digital habits affect the planet and strategies to minimize your digital carbon footprint.",
    category: "Technology",
    author: "Alex Turner",
    date: "Apr 8, 2023",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 6,
    title: "Corporate Sustainability: Beyond the PR Statements",
    excerpt: "Analyzing genuine corporate sustainability initiatives and how businesses can truly make a difference.",
    category: "Business",
    author: "Rachel Morgan",
    date: "Mar 15, 2023",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
];

const categories = [
  "All",
  "Lifestyle",
  "Technology",
  "Education",
  "Business",
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold mb-4">
                Sustainability <span className="eco-gradient-text">Knowledge Hub</span>
              </h1>
              <p className="text-muted-foreground text-lg mx-auto max-w-2xl">
                Stay informed with the latest articles, tips, and insights on sustainability, 
                climate action, and environmental innovation.
              </p>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-eco-emerald hover:bg-eco-forest text-white"
                    : "text-foreground hover:text-eco-emerald"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Blog posts grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="eco-card overflow-hidden h-full flex flex-col">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-2 left-2">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <Tag className="h-3 w-3 text-eco-emerald" />
                        <span>{post.category}</span>
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2 flex-grow">
                    <CardTitle className="text-xl mb-2 line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Button variant="ghost" className="w-full text-eco-emerald hover:text-eco-forest justify-between">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load more button */}
            <div className="mt-12 text-center">
              <Button variant="outline" className="border-eco-emerald text-eco-emerald hover:bg-eco-emerald/10">
                Load More Articles
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
