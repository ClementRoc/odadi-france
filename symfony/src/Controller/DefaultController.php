<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="app_home", methods="GET")
     */
    public function home(): Response
    {
        return $this->render('home.html.twig');
    }

    /**
     * @Route("/actualités", name="app_news", methods="GET")
     */
    public function actuality(): Response
    {
        return $this->render('news.html.twig');
    }

    /**
     * @Route("/nos-actions", name="app_actions", methods="GET")
     */
    public function actions(): Response
    {
        return $this->render('actions.html.twig');
    }

    /**
     * @Route("/histoire", name="app_history", methods="GET")
     */
    public function history(): Response
    {
        return $this->render('history.html.twig');
    }

    /**
     * @Route("/contact", name="app_contact", methods="GET")
     */
    public function contact(): Response
    {
        return $this->render('contact.html.twig');
    }
}